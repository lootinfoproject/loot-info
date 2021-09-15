#!/bin/bash

echo "Running Release Tasks"

echo "Running Migrations"
rake db:migrate

echo "Running after deploy task"
rake callbacks:after_deploy
