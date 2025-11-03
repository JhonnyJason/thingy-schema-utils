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
        // await specialTest()
        await runRawTypeTests(testsForType)
        await runSchemaTests(testsForSchema) 
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

    const err = validate(input)
    const err2 = m.validate(input, schema)
    if (err !== err2) {
        return report.failReports.push("@"+caseId+" validation functions differed! err:"+err+":"+m.getErrorMessage(err)+" err2:"+err2+":"+m.getErrorMessage(err2))        
    }
    // console.log("after validation!")

    if(err && shouldBeValid) {
        return report.failReports.push("@"+caseId+" wrong Validation! shouldBeValid:"+shouldBeValid+" err:"+err+" errMessage:"+m.getErrorMessage(err))
    } else if(err &&  !shouldBeValid) {  
        return report.successes++ 
    } else if(!err && !shouldBeValid) {
        return report.failReports.push("@"+caseId+" wrong Validation! shouldBeValid:"+shouldBeValid+" err:"+err+" errMessage:"+m.getErrorMessage(err))
    }else {
        return report.successes++
    }
}


async function specialTest() {
    const count = 10000000

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
            // console.log(caseId)
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