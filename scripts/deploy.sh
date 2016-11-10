#!/bin/bash

set -e

echo "Starting to update gh-pages\n"

cp -R dist $HOME/dist

cd $HOME
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis"

git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/${GH_USER}/${GH_REPO}.git gh-pages > /dev/null

cd gh-pages
cp -Rf $HOME/dist/* .

git add -f .
git commit -m "Travis build $TRAVIS_BUILD_NUMBER"
git push -fq origin gh-pages > /dev/null

echo "Done updating gh-pages\n"