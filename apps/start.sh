#!/bin/bash

# Caminho para os projetos
IF_FRONT=~/www/InsightFinder/apps/frontend
IF_BACKEND=~/www/InsightFinder/apps/backend

ptyxis --tab --title="FRONT-END" -- bash -lic "cd $IF_FRONT && pnpm dev" &
ptyxis --tab --title="BACK-END" -- bash -lic "cd $IF_BACKEND && pnpm start:dev" &
ptyxis --tab --title="DATABASE" -- bash -lic "cd $IF_BACKEND && pnpm db:studio"

wait
