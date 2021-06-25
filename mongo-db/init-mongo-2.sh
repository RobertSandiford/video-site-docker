#!/bin/bash
set -e;

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.placeholder.insert({ 'placeholder' : '' })
EOJS

if [ -n "${mongo_db_user:-}" ] && [ -n "${mongo_db_pass:-}" ]; then
	"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
		db.createUser({
			user: $(_js_escape "$mongo_db_user"),
			pwd: $(_js_escape "$mongo_db_pass"),
			roles: ["readWrite"]
		})
	EOJS
else
	# print warning or kill temporary mongo and exit non-zero
    echo "warning"
fi