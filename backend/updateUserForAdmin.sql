-- set any user into admin with this in the mysql command line
-- isAdmin is a boolean with 1 = true and 0 = false
-- by default isAdmin is set to 0 for all users
-- if needed, use this code to update a profile and grant admin privileges to the user
-- database : socialnetwork, table : users
update users set isAdmin = 1 where id = 1;