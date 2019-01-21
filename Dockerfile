FROM node:8-slim

LABEL "com.github.actions.name"="Mirror Labels to Child"
LABEL "com.github.actions.description"="A GitHub Action to mirror labels to child."
LABEL "com.github.actions.icon"="copy"
LABEL "com.github.actions.color"="purple"

LABEL "repository"="http://github.com/adamzolyak/mirror-labels-to-child-action"
LABEL "homepage"="http://www.tinkurlab.com"
LABEL "maintainer"="Adam Zolyak <adam@tinkurlab.com>"

ADD entrypoint.sh /action/entrypoint.sh
ADD package.json /action/package.json
ADD app.js /action/app.js
ADD helpers.js /action/helpers.js

RUN chmod +x /action/entrypoint.sh

ENTRYPOINT ["/action/entrypoint.sh"]