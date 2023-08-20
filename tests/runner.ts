import { equal } from "assert";

type TestExecutor = (name: string, fn: ()=> void) => void;
type TestDecl = (test: TestExecutor) => void;
/*
 -1 => pending,
 0 => failed
 1 => passed
*/
function runner(declareTests: TestDecl) {
    const testList = [];
    const test: TestExecutor = (name: string, fn: ()=> void)=>{
        testList.push([ name, fn, -1 ]);
    }

    const executeTest = () => {
        testList.forEach((test)=>{
            const [name, fn] = test;
            try {
                fn();
                console.log(`[Success] ${name}`);
                test[2] = 1;
            } catch(ex) {
                console.error(`[Failed] ${name}\n`, ex);
                test[2] = 0;
            }   
        })
    };

    function checkStatus(){
        const expectedSuccessRuns = testList.length;
        const actualSuccessRuns = testList.map((test)=>test[2]).reduce((result, next)=> next + result, 0);
        equal(actualSuccessRuns, expectedSuccessRuns);
        console.log("Test pass: Success");
    }

    declareTests(test);
    executeTest();
    checkStatus();    
}

export {
    runner
};

