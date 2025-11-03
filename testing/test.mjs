import { execute } from "thingy-allmodules-sync/syncprocessmodule.js"
import * as m from "../output/index.js"

import { testsForType } from "./rawTypeTests.mjs"
import { testsForSchema } from "./schemaTests.mjs"
import { typeMap as typeToString } from "./typeMap.mjs"

import * as oldVal from "./oldValidateTiming.mjs"
import * as newVal from "./newValidateTiming.mjs"

const report = Object.create(null)

report.successes = 0
report.failReports = []

const printReport = function() {
    const reportString = JSON.stringify(report, null, 4)
    console.log(reportString)
}

const olog = function(arg) {
    console.log(JSON.stringify(arg, null, 4))
}

async function run() {
    //run tests
    try {
        await specialTest()
        // await runRawTypeTests(testsForType)
        // await runSchemaTests(testsForSchema) 
        // await runSchemaStringifySpeedTests(testsForSchema) 
    } catch (error) {
        console.error(error)
        report.unexpectedError = error.message
    }
    printReport()
}

run()


function executeTestCase(caseId, schema, input, shouldBeValid) {
    // console.log("executeTestCase @"+caseId)
    // olog({schema, input, shouldBeValid})
    const validate = m.createValidator(schema)
    // console.log("created the validator!")
    const stringify = m.createStringifier(schema)
    // console.log("created the stringifier!")

    const err = validate(input)
    // console.log("after validation!")

    if(err && shouldBeValid) {
        return report.failReports.push("\n@"+caseId+" wrong Validation! shouldBeValid:"+shouldBeValid+" err:"+err+" errMessage:"+m.getErrorMessage(err))
    } else if(err &&  !shouldBeValid) {  
        return report.successes++ 
    } else if(!err && !shouldBeValid) {
        return report.failReports.push("\n@"+caseId+" wrong Validation! shouldBeValid:"+shouldBeValid+" err:"+err+" errMessage:"+m.getErrorMessage(err))
    }

    const ref = JSON.stringify(input)
    const ours = stringify(input)
    if(ref !== ours) {
        return report.failReports.push("\n@"+caseId+" "+ours+" != "+ref+" original was: "+input)
    } else {
        return report.successes++
    }

}

function executeStringifySpeedTest(caseId, schema, input) {
    // console.log("executeTestCase @"+caseId)
    // olog({schema, input})
    const validate = m.createValidator(schema)
    // console.log("created the validator!")
    const stringify = m.createStringifier(schema)
    // console.log("created the stringifier!")

    var err = validate(input)
    // console.log("after validation!")

    if(err) {
        return report.failReports.push("\n@"+caseId+" Validation failed! err:"+err+" errMessage:"+m.getErrorMessage(err))
    }

    var ref = JSON.stringify(input)
    var ours = stringify(input)
    if(ref !== ours) {
        return report.failReports.push("\n@"+caseId+" "+ours+" != "+ref+" original was: "+input)
    }

    const initialCount = 1000000
    // warmup
    var timeMS, start;
    var count = initialCount
    while(count--) {
        ref = JSON.stringify(input)
    }
    count = initialCount
    while(count--) {
        ours = stringify(input)
    }

    // JSON.stringify go
    count = initialCount
    start = performance.now()
    while(count--) {
        ref = JSON.stringify(input)
    }
    timeMS = performance.now() - start
    console.log(caseId+" JSON.stringify: "+timeMS)

    count = initialCount
    start = performance.now()
    while(count--) {
        ours = stringify(input)
    }
    timeMS = performance.now() - start
    console.log(caseId+" ourStringify: "+timeMS)

    count = initialCount
    start = performance.now()
    while(count--) {
        err = validate(input)
        if (err !== undefined) {
            return report.failReports.push("\n@"+caseId+" Validation failed! err:"+err+" errMessage:"+m.getErrorMessage(err))
        } else { ref = JSON.stringify(input) }
    }
    timeMS = performance.now() - start
    console.log(caseId+" validate + JSON.stringify: "+timeMS)

    count = initialCount
    start = performance.now()
    while(count--) {
        err = validate(input)
        if (err !== undefined) {
            return report.failReports.push("\n@"+caseId+" Validation failed! err:"+err+" errMessage:"+m.getErrorMessage(err))
        } else { ours = stringify(input) }
    }
    timeMS = performance.now() - start
    console.log(caseId+" validate + ourStringify: "+timeMS)
    console.log("")
}

async function specialTest() {
    const count = 1000000

    oldVal.testValidateSpeed(count)
    newVal.testValidateSpeed(count)


    // const type = 17
    // const caseId = "NONEMPTYARRAY:14"
    // const test = [new Array(100).fill("a"), true]
    // const input = test[0]
    // const shouldBeValid = test[1]
    // console.log(caseId)
    // executeTestCase(caseId, type, input, shouldBeValid)

    // const schemaTest = testsForSchema[0]
    // const schema = schemaTest.schema
    // const caseId = "schema:0:valid:0"
    // const input = schemaTest.validSamples[0]
    // const shouldBeValid = true
    // executeTestCase(caseId, schema, input, shouldBeValid)
}

async function runRawTypeTests(tests) {
    var typeString, type;
    for(var i = 0; i < tests.length; i++) {
        if(!Array.isArray(tests[i])) {continue}
        type = i
        typeString = typeToString[type]
        var testCases = tests[type]
        for(var j = 0;  j < testCases.length; j++) {
            var testCase = testCases[j]
            var input = testCase[0]
            var shouldBeValid = testCase[1]
            var caseId = typeString+":"+j
            var schema = type 
            console.log(caseId)
            executeTestCase(caseId, schema, input, shouldBeValid)
        }
    }
}

async function runSchemaTests(tests) {
    var schemaTest, schema, validSamples,shouldBeValid,invalidSamples,caseId, input, i, j;

    for(i = 0; i < tests.length; i++) {
        schemaTest = tests[i]
        schema = schemaTest.schema

        //checking valid ones...
        validSamples = schemaTest.validSamples
        shouldBeValid = true
        for(j = 0; j < validSamples.length; j++) {
            caseId = "schema:"+i+":valid:"+j
            input = validSamples[j]
            executeTestCase(caseId, schema, input, shouldBeValid)
        }

        //checking invalid ones...
        //checking valid ones...
        invalidSamples = schemaTest.invalidSamples
        shouldBeValid = false
        for(j = 0; j < invalidSamples.length; j++) {
            caseId = "schema:"+i+":invalid:"+j
            input = invalidSamples[j]
            executeTestCase(caseId, schema, input, shouldBeValid)
        }

    }

}


async function runSchemaStringifySpeedTests(tests) {
    var schemaTest, schema, validSamples,caseId, input, i, j;

    for(i = 0; i < tests.length; i++){
        schemaTest = tests[i]
        schema = schemaTest.schema

        //checking valid ones...
        validSamples = schemaTest.validSamples
        for(j = 0; j < validSamples.length; j++) {
            caseId = "schema:"+i+":valid:"+j
            input = validSamples[j]
            executeStringifySpeedTest(caseId, schema, input)
        }
    }
}