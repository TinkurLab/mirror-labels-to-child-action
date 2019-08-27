const helpers = require('../helpers')
let octokit = require('@octokit/rest')()

octokit = jest.fn()
octokit.authenticate = jest.fn()

describe('getOwner', () => {
  it('should return owner when passed GITHUB_REPOSITORY env variable', () => {
    const result = helpers.getOwner('adamzolyak/actions-playground')
    expect(result).toBe('adamzolyak')
  })
})

describe('getRepo', () => {
  it('should return repo when passed GITHUB_REPOSITORY env variable', () => {
    const result = helpers.getRepo('adamzolyak/actions-playground')
    expect(result).toBe('actions-playground')
  })
})

describe('getParent', () => {
  it('child of - should return parent info with child owner/repo if parent owner/repo is NOT provided', async () => {
    const eventOwner = 'adamzolyak'
    const eventRepo = 'actions-playground'
    const issueBody = 'child of #59'

    const result = await helpers.getParent(eventOwner, eventRepo, issueBody)

    expect(result.parentOwner).toBe('adamzolyak')
    expect(result.parentRepo).toBe('actions-playground')
    expect(result.parentIssueNumber).toBe('59')
  })

  it('child to - should return parent info with child owner/repo if parent owner/repo is NOT provided', async () => {
    const eventOwner = 'adamzolyak'
    const eventRepo = 'actions-playground'
    const issueBody = 'child to #59'

    const result = await helpers.getParent(eventOwner, eventRepo, issueBody)

    expect(result.parentOwner).toBe('adamzolyak')
    expect(result.parentRepo).toBe('actions-playground')
    expect(result.parentIssueNumber).toBe('59')
  })

  it('child - should return parent info with child owner/repo if parent owner/repo is NOT provided', async () => {
    const eventOwner = 'adamzolyak'
    const eventRepo = 'actions-playground'
    const issueBody = 'child #59'

    const result = await helpers.getParent(eventOwner, eventRepo, issueBody)

    expect(result.parentOwner).toBe('adamzolyak')
    expect(result.parentRepo).toBe('actions-playground')
    expect(result.parentIssueNumber).toBe('59')
  })

  it('mutiline issue body - should return parent info with child owner/repo if parent owner/repo is NOT provided', async () => {
    const eventOwner = 'adamzolyak'
    const eventRepo = 'actions-playground'
    const issueBody =
      'to do\r\n- [ ] thing\r\n- [x] thing\r\n\r\n[bug, que]\r\nchild of #59'

    const result = await helpers.getParent(eventOwner, eventRepo, issueBody)

    expect(result.parentOwner).toBe('adamzolyak')
    expect(result.parentRepo).toBe('actions-playground')
    expect(result.parentIssueNumber).toBe('59')
  })

  it('child of - should return parent info with parent owner/repo if parent owner/repo is provided', async () => {
    const eventOwner = 'adamzolyak'
    const eventRepo = 'actions-playground'
    const issueBody = 'child of adamzolyak2/actions-playground2#59'

    const result = await helpers.getParent(eventOwner, eventRepo, issueBody)

    expect(result.parentOwner).toBe('adamzolyak2')
    expect(result.parentRepo).toBe('actions-playground2')
    expect(result.parentIssueNumber).toBe('59')
  })

  it('child to - should return parent info with parent owner/repo if parent owner/repo is provided', async () => {
    const eventOwner = 'adamzolyak'
    const eventRepo = 'actions-playground'
    const issueBody = 'child to adamzolyak2/actions-playground2#59'

    const result = await helpers.getParent(eventOwner, eventRepo, issueBody)

    expect(result.parentOwner).toBe('adamzolyak2')
    expect(result.parentRepo).toBe('actions-playground2')
    expect(result.parentIssueNumber).toBe('59')
  })

  it('child - should return parent info with parent owner/repo if parent owner/repo is provided', async () => {
    const eventOwner = 'adamzolyak'
    const eventRepo = 'actions-playground'
    const issueBody = 'child adamzolyak2/actions-playground2#59'

    const result = await helpers.getParent(eventOwner, eventRepo, issueBody)

    expect(result.parentOwner).toBe('adamzolyak2')
    expect(result.parentRepo).toBe('actions-playground2')
    expect(result.parentIssueNumber).toBe('59')
  })

  it('should return parent info with parent owner/repo if parent owner/repo is provided', async () => {
    const eventOwner = 'adamzolyak'
    const eventRepo = 'actions-playground'
    const issueBody =
      'to do\r\n- [ ] thing\r\n- [x] thing\r\n\r\n[bug, que]\r\nchild of adamzolyak3/actions-playground3#59'

    const result = await helpers.getParent(eventOwner, eventRepo, issueBody)

    console.log('multiline result', result)

    expect(result.parentOwner).toBe('adamzolyak3')
    expect(result.parentRepo).toBe('actions-playground3')
    expect(result.parentIssueNumber).toBe('59')
  })

  it('should return false if no parent relationship', async () => {
    const eventOwner = 'adamzolyak'
    const eventRepo = 'actions-playground'
    const issueBody = 'this is an issue without a parent'

    const result = await helpers.getParent(eventOwner, eventRepo, issueBody)

    expect(result).toBe(false)
  })
})

describe('addLabel', () => {
  it('should add label to issue', async () => {
    let octokit = {
      issues: {
        addLabels: jest.fn().mockResolvedValue({ something: 'something' })
      }
    }

    const result = await helpers.addLabel(
      octokit,
      'adamzolyak',
      'actions-playground',
      '1',
      ['Incomplete Tasks', 'Help Wanted']
    )
    expect(octokit.issues.addLabels).toHaveBeenCalledTimes(1)
    expect(octokit.issues.addLabels.mock.calls[0][0].labels).toEqual([
      'Incomplete Tasks',
      'Help Wanted'
    ])
  })
})
