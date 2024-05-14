import wrappers from '../../src/wrappers';

describe('course', () => {
    test('request cmpt courses', async () => {
        const courses = await wrappers.courses('arch', 2023, 'fall');
        
        // console.log("=== BEFORE ===");
        // console.log(courses.map(obj => obj.number));

        courses.sort((a, b) => {
            // `localeCompare` will sort strings, since the course number is
            // actually a string. This is because a course number can include
            // letters like a "w" for writing courses. For example, "105w".
            return a.number.localeCompare(b.number);
        });

        // console.log("=== AFTER ===");
        // console.log(courses.map(obj => obj.number));

        // console.log("=== DUPE START ===");
        // const duplicatesMap: Record<string, boolean> = {};
        // courses.forEach(value => {
        //     if (duplicatesMap[value.number]) {
        //         console.log(`Duplicate entry: ${value.number}`);
        //     } else {
        //         duplicatesMap[value.number] = true;
        //     }
        // });
        // console.log("=== DUPE END ===");

        // expect(courses).toMatchSnapshot();
        expect(courses.map(obj => obj.number)).toMatchSnapshot();
    }, 15000);
});
