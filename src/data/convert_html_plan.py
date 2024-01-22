import pandas as pd
import re
import numpy as np

def convert_html_plan(html_file, courses_in_first_sem, years):
    pd.set_option('display.max_columns', None)
    dfs = pd.read_html(html_file, skiprows=[0])
    # To not have the first row as column indexes
    courses = []
    count = 0
    for df in dfs:
        if len(df.columns) == 9:
            count += 1
            # Reformatting the df that was read from the html, mainly fixing the column names by shifting them down
            # and turning them into the first row and leaving the column names as numbers from 0 to 8 which we later
            # drop or rename according to out needs
            result = pd.DataFrame(np.vstack([df.columns, df])).drop([4, 5], axis=1) \
                .rename({0: 'Course', 1: 'ID', 2: 'Year', 3: 'Semester', 6: 'Credits', 7: 'Prerequisites to Take',
                         8: 'Prerequisites to Pass'}, axis=1)
            # we assign a year to courses from year 1 to 5
            result['Year'] = count if count <= years else ("Electives" if count == years + 1 else 'Other Requirements')
            # Replace some of the unwanted text
            result.replace(to_replace=r'^0\.00|Unnamed.*', value=np.nan, regex=True, inplace=True)
            i = 0
            j = 0
            size = len(result.index)
            course_count = 0
            while i < size:
                if i + 1 - j >= len(result['Course'].index):
                    # for the final case
                    result = result.drop(i, axis=0)
                elif not (pd.isnull(result['Course'].iloc[i + 1 - j])
                          or re.search(r'Para cursar', result['Course'].iloc[i + 1 - j])):
                    # We remove rows that are not relevant
                    result = result.drop(i, axis=0)
                    j += 1
                else:
                    if re.search('Para cursar', str(result['Course'].iloc[i + 1 - j])):
                        # To add all the prerequisites to their respective columns: Prerequisites to take and pass
                        # In the original df we have one string that contains all the prereqs to take and pass a class
                        # We split that into the prereqs to take and prereqs to pass.
                        # We clean it all and add string versions of tuples containing the prereq course ID and the specific
                        # requirement (Aprobado o Regularizado) to the respective columns (Prerequisites to Take and
                        # Prerequisites to Pass)
                        # We start off parsing a string that looks like this:
                        #   'Para cursar  Verificar  Ocultar  OpciÃ³n 1  Requisito  CondiciÃ³n  AnÃ¡lisis MatemÃ¡tico I
                        #   (GIINDAM1)  Regularizada  Para aprobar  Verificar  Ocultar  OpciÃ³n 1  Requisito  CondiciÃ³n
                        #   AnÃ¡lisis MatemÃ¡tico I (GIINDAM1)  Aprobada'

                        prereq_str = result['Course'].iloc[i + 1 - j]
                        prereqs = prereq_str.split('Para aprobar')
                        for k in range(2):
                            pattern1 = re.compile(r'\((\w+)\)\s+(\w+)\s*')
                            pattern2 = re.compile(r'MÃ³dulo: (\d+)')
                            matches1 = pattern1.findall(prereqs[k]) if len(prereqs) != 1 else pattern1.findall(prereqs[0])
                            matches2 = pattern2.findall(prereqs[k]) if len(prereqs) != 1 else pattern2.findall(prereqs[0])
                            matches2 = [(int(number), 'Aprobado') for number in matches2]
                            matches = matches1 + matches2
                            matches_str = ''
                            for n in range(len(matches)):
                                matches_str += '(' + str(matches[n][0]) + ', ' + str(matches[n][1]) + ')'
                                if n + 1 < len(matches):
                                    matches_str += ', '
                            if k == 0:
                                result.loc[i, 'Prerequisites to Take'] = matches_str
                            else:
                                result.loc[i, 'Prerequisites to Pass'] = matches_str

                    # To extract the ID from the Course column
                    result.loc[i, 'ID'] = re.findall(r'\(([^)]+)\)', result.loc[i, 'Course'])[0]
                    # To convert it into valid spanish text and to remove the id from the 'Course' column
                    result.loc[i, 'Course'] = result.loc[i, 'Course'].encode('latin-1').decode('utf-8').split(' (')[0]
                    # To obtain the semester
                    result.loc[i, 'Semester'] = 1 if count <= 5 and courses_in_first_sem[count - 1] > course_count else 2
                    result.loc[i, 'Semester'] = np.nan if count > 5 else result.loc[i, 'Semester']
                    course_count += 1
                i += 1
            courses.append(result)

    main_plan = pd.concat(courses).reset_index().drop(columns=['index'])

    main_plan["Prerequisite to Take for"] = None
    main_plan["Prerequisite to Pass for"] = None
    for i, row in main_plan.iterrows():
        pattern = re.compile(r'(\([A-Za-z]+[0-9]*\, [A-Za-z0-9]+\))')
        if not pd.isnull(row['Prerequisites to Take']):
            matches1 = pattern.findall(row['Prerequisites to Take'])
            matches2 = pattern.findall(row['Prerequisites to Pass'])
            for match1 in matches1:
                id = match1.split(', ')[0].lstrip('(')
                status = match1.split(', ')[1].rstrip(')')
                idx = main_plan.index[main_plan['ID'] == id]
                cur_val = main_plan.iloc[idx[0]]['Prerequisite to Take for']
                if pd.isnull(cur_val):
                    main_plan['Prerequisite to Take for'][idx[0]] = '(' + str(row['ID']) + ', ' + status + ')'
                else:
                    main_plan['Prerequisite to Take for'][idx[0]] = str(cur_val) +  ', ' + '(' + str(row['ID']) + ', ' + status + ')'
            for match2 in matches2:
                id = match2.split(', ')[0].lstrip('(')
                status = match2.split(', ')[1].rstrip(')')
                idx = main_plan.index[main_plan['ID'] == id]
                cur_val = main_plan.iloc[idx[0]]['Prerequisite to Pass for']
                if pd.isnull(cur_val):
                    main_plan['Prerequisite to Pass for'][idx[0]] = '(' + str(row['ID']) + ', ' + status + ')'
                else:
                    main_plan['Prerequisite to Pass for'][idx[0]] = str(cur_val) + ', ' + '(' + str(row['ID']) + ', ' + status + ')'

    main_plan.to_excel('plan.xlsx')
    main_plan.to_json('plan.json', orient="records", indent=2)

if __name__ == '__main__':
    courses_in_first_sem = [5, 6, 7, 6, 3]
    years = 5
    convert_html_plan('siu.html',courses_in_first_sem, years)
