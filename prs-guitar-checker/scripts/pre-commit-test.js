#!/usr/bin/env node
// Pre-commit hook to run PRS identification stress test
// This ensures the identification logic is working correctly before committing

import { identifyPRS } from '../src/utils/prsIdentifier.js';
import { STRESS_TEST_SERIALS } from '../src/utils/stressTest.js';

console.log('🔍 Running PRS identification stress test...\n');

let passed = 0;
let failed = 0;
const failures = [];

STRESS_TEST_SERIALS.forEach((test) => {
  const result = identifyPRS(test.serial);
  
  if (result.error) {
    failures.push({
      serial: test.serial,
      expected: test.expected,
      actual: { error: result.error },
      source: test.source,
    });
    failed++;
  } else {
    const r = result.results[0];
    const yearMatch = Array.isArray(test.expected.year)
      ? test.expected.year.includes(r.year)
      : String(r.year) === String(test.expected.year);
    
    const modelMatch = r.model.includes(test.expected.model.split(' ')[0]) ||
                       test.expected.model.includes(r.model.split(' ')[0]);
    
    if (yearMatch && modelMatch) {
      passed++;
    } else {
      failures.push({
        serial: test.serial,
        expected: test.expected,
        actual: { year: r.year, model: r.model },
        source: test.source,
      });
      failed++;
    }
  }
});

const total = STRESS_TEST_SERIALS.length;
const successRate = ((passed / total) * 100).toFixed(1);

console.log(`Results: ${passed} passed, ${failed} failed out of ${total} total`);
console.log(`Success rate: ${successRate}%\n`);

if (failures.length > 0) {
  console.log('❌ Test failures:\n');
  failures.slice(0, 10).forEach((f) => {
    console.log(`  ${f.serial.padEnd(20)} Expected: ${JSON.stringify(f.expected)}`);
    console.log(`  ${' '.repeat(20)} Got:      ${JSON.stringify(f.actual)}`);
    console.log(`  ${' '.repeat(20)} Source:   ${f.source}\n`);
  });
  
  if (failures.length > 10) {
    console.log(`  ... and ${failures.length - 10} more failures\n`);
  }
  
  console.log('❌ Pre-commit hook failed: Stress test did not pass');
  console.log('Please fix the identification logic before committing.\n');
  process.exit(1);
} else {
  console.log('✅ All stress tests passed!');
  console.log('Proceeding with commit...\n');
  process.exit(0);
}
