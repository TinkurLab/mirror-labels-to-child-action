const fs = require('fs')

module.exports.readFilePromise = function(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  }).catch(err => {
    console.log(err)
  })
}

module.exports.getOwner = function(eventOwnerAndRepo) {
  const slicePos1 = eventOwnerAndRepo.indexOf('/')
  return eventOwnerAndRepo.slice(0, slicePos1)
}

module.exports.getRepo = function(eventOwnerAndRepo) {
  const slicePos1 = eventOwnerAndRepo.indexOf('/')
  return eventOwnerAndRepo.slice(slicePos1 + 1, eventOwnerAndRepo.length)
}

module.exports.getParent = function(eventOwner, eventRepo, eventIssueBody) {
  var regex = /^child(?: of| to)? (?:([^/]*)\/([^/]*))?#([0-9]+)/im
  var found = eventIssueBody.match(regex)

  if (found) {
    if (found[1]) {
      return {
        parentOwner: found[1],
        parentRepo: found[2],
        parentIssueNumber: found[3]
      }
    } else {
      return {
        parentOwner: eventOwner,
        parentRepo: eventRepo,
        parentIssueNumber: found[3]
      }
    }
  } else {
    return false
  }
}

module.exports.getLabels = async function(octokit, owner, repo, issueNumber) {
  const options = octokit.issues.listLabelsOnIssue.endpoint.merge({
    owner: owner,
    repo: repo,
    issue_number: issueNumber
  })

  return await octokit
    .paginate(options)
    .then(data => {
      return data
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports.addLabel = function(
  octokit,
  eventOwner,
  eventRepo,
  eventIssueNumber,
  labels
) {
  octokit.issues
    .addLabels({
      owner: eventOwner,
      repo: eventRepo,
      issue_number: eventIssueNumber,
      labels: labels
    })
    .then(({ data, headers, status }) => {
      // handle data
    })
    .catch(err => {
      console.log(err)
    })
}
