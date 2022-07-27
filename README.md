# ATT U-verse Automated Router Rebooter

This script allows you to schedule a reboot of your AT&T U-verse router (Tested on 5268AC). Unfortunately the 5268AC router has a bug which causes network latency over time (more so when using Gigabit Fiber).   

# Installation

- Clone repo to your server
- Schedule "node reboot.js" via crontab, PM2 etc.

npm install  
node reboot.js  

# Configuration

Inside reboot.js edit the following two values.

var routerAccessCode = "";  
var routerIP = "192.168.1.254";  

Additional code changes have been made to reference the THISPAGE & NEXTPAGE value as a variable called PAGE.

For a broadband restart, the code can be easily be modified to change RESTART to RESET_BB, and change the value of the PAGE variable from C_5_7 back to A_0_0 if needed.
