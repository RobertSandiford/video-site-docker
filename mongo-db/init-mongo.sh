#!/bin/bash
set -e

mongo <<EOF
use video-site

db.placeholder.insert({ 'placeholder' : '' })

db.createUser({
    user: '$mongo_db_user',
    pwd: '$mongo_db_pass',
    roles: ["readWrite"],
})
EOF