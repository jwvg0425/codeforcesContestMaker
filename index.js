const axios = require('axios');
const Promise = require('bluebird');
const fs = require('fs');
const shuffle = require('shuffle-array');

function loadFromFile(fileName) {
  return fs.readFileSync(fileName).toString().split(/[ \r\n]+/).filter((x) => x !== '');
}

const used = loadFromFile(process.argv[2]);
const users = loadFromFile(process.argv[3]);
const diffs = loadFromFile(process.argv[4]).map((x) => Number(x));
const isShuffle = process.argv[5] && process.argv[5] === 'shuffle';

async function loadAllProblem() {
  const { problems } = await axios.get('https://codeforces.com/api/problemset.problems').then(response => response.data.result);

  return problems.filter(problem => !!problem.rating && problem.contestId >= 400 && !problem.tags.find(tag => tag === '*special'));
}

async function getSubmission(user) {
  console.log(`load ${user}'s submission...`);
  return axios.get(`https://codeforces.com/api/user.status?handle=${user}`).then(response => response.data.result);
}

function isSolve(submissions, problem) {
  return submissions.filter(submission => submission.verdict === 'OK' &&
    submission.problem.contestId === problem.contestId &&
    submission.problem.index === problem.index).length > 0;
}

function pickRandomProblem(problems, submissionList, difficulty) {
  console.log(`pick ${difficulty}...`);
  const filtered = problems.filter(problem => problem.rating === difficulty);

  while(true) {
    const problem = filtered[Math.floor(Math.random() * filtered.length)];

    if (used.find(x => x === `${problem.contestId}${problem.index}`)) {
      continue;
    }

    if (submissionList.every(submissions => !isSolve(submissions, problem))) {
      used.push(`${problem.contestId}${problem.index}`);
      return `${problem.contestId}${problem.index}`;
    }
  }
}

async function waitForSecond(second) {
  return new Promise(resolve => setTimeout(resolve, second * 1000));
}

async function makeList() {
  console.log('load problems...');
  const problems = await loadAllProblem();
  console.log('load submissions...');
  const submissions = await Promise.mapSeries(users, async user => {
    const submission = await getSubmission(user)
    await waitForSecond(1)
    return submission;
  });

  const list = diffs.map(diff => pickRandomProblem(problems, submissions, diff));

  if (isShuffle) {
    return shuffle(list).join('\n');
  } else {
    return list.join('\n');
  }
}

makeList().then(console.log).catch(console.error);
