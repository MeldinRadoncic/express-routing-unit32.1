const express = require('express');
const ExpressError = require('./expressError')
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

function convertNums(numbers) {
  let result = [];

  for (let i = 0; i < numbers.length; i++) {
    let toNumber = Number(numbers[i]);

    if (Number.isNaN(toNumber)) {
      return new Error(
        `The value '${numbers[i]}' at ${i} is not a number.`
      );
    }

    result.push(toNumber);
  }
  return result;
}


function findMean(nums) {
  if (nums.length === 0) return 0;
  return nums.reduce(function(acc, cur) {
    return acc + cur;
  }) / nums.length
}


function findMedian(nums) {

  nums.sort((a, b) => a - b);

  let middleIndex = Math.floor(nums.length / 2);
  let median;

  if (nums.length % 2 === 0) {
    median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
  } else {
    median = nums[middleIndex];
  }
  return median
}


function createFrequencyCounter(arr) {
  return arr.reduce(function(acc, next) {
    acc[next] = (acc[next] || 0) + 1;
    return acc;
  }, {});
}

function findMode(arr) {
  let freqCounter = createFrequencyCounter(arr);

  let count = 0;
  let mostFrequent;

  for (let key in freqCounter) {
    if (freqCounter[key] > count) {
      mostFrequent = key;
      count = freqCounter[key];
    }
  }

  return +mostFrequent;
}

app.get('/mean', function(req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError('Must be a number with comma separated.', 400)
  }
  let numbers = req.query.nums.split(',');

  let nums = convertNums(numbers);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }


  let result = {
    operation: "mean",
    result: findMean(nums)
  }

  return res.send(result);
});

app.get('/median', function(req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError('Must be a number with comma separated.', 400)
  }
  let numbers = req.query.nums.split(',');

  let nums = convertNums(numbers);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: "median",
    result: findMedian(nums)
  }

  return res.send(result);

});

app.get('/median', function(req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError('Must be a number with comma separated.', 400)
  }
  let numbers = req.query.nums.split(',');

  let nums = convertNums(numbers);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: "mode",
    result: findMode(nums)
  }

  return res.send(result);
});


app.listen(5000, () => {
  console.log('Server is running on PORT 5000');
})
