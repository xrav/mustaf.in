#!/bin/bash

echo 'start deploy proccess'

ssh rav@mustaf.in 'cd /home/mustafin/www && pwd & git pull origin master'

echo 'deploy finished'
