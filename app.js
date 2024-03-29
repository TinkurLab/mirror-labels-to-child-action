console.log('started nodejs...')

const helpers = require('./helpers')

//require octokit rest.js
//more info at https://github.com/octokit/rest.js
const { Octokit } = require('@octokit/rest')
const octokit = new Octokit({
  auth: `token ${process.env.GITHUB_TOKEN}`,
})

async function mirrorLabelsToChild() {
  try {
    //set eventOwner and eventRepo based on action's env variables
    const eventOwnerAndRepo = process.env.GITHUB_REPOSITORY
    const eventOwner = helpers.getOwner(eventOwnerAndRepo)
    const eventRepo = helpers.getRepo(eventOwnerAndRepo)

    //read contents of action's event.json
    const eventData = await helpers.readFilePromise('..' + process.env.GITHUB_EVENT_PATH)
    const eventJSON = JSON.parse(eventData)

    if (eventData) {
      //set eventAction and eventIssueNumber
      eventAction = eventJSON.action
      eventIssueNumber = eventJSON.issue.number
      eventIssueBody = eventJSON.issue.body

      if (eventAction === 'opened' || eventAction === 'edited' || eventAction === 'reopened') {
        //check if there is a parent relationship in the issue
        let issueParent = await helpers.getParent(eventOwner, eventRepo, eventIssueBody)

        if (issueParent) {
          const parentLabels = await helpers.getLabels(
            octokit,
            issueParent.parentOwner,
            issueParent.parentRepo,
            issueParent.parentIssueNumber
          )

          if (parentLabels.length > 0) {
            const labelsToAdd = parentLabels.map(({ name }) => name)

            console.log('parent w/ labels - labeling child')

            helpers.addLabel(octokit, eventOwner, eventRepo, eventIssueNumber, labelsToAdd)
          } else {
            console.log('parent w/o labels - NOT labeling child')
          }

          //TODO: handle parent repo not found

          //TODO: handle multiple parents

          //TODO: handle paging labels in parent
        } else {
          console.log('child has no parent')
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

//run the function
mirrorLabelsToChild()

module.exports.mirrorLabelsToChild = mirrorLabelsToChild
