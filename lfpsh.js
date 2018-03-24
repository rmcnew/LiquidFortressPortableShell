// Liquid Fortress Portable Shell
//
// Copyright (c) 2018.  Richard Scott McNew.
//
// This file is part of Liquid Fortress Portable Shell.
//
// Liquid Fortress Portable Shell is free software: you can redistribute
// it and/or modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// Liquid Fortress Portable Shell is distributed in the hope that it will
// be useful, but WITHOUT ANY WARRANTY; without even the implied
// warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
// See the GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Liquid Fortress Portable Shell.
// If not, see <http://www.gnu.org/licenses/>.


// Liquid Fortress Portable Shell (lfpsh) uses Java Nashorn engine to portably 
// implement Unix-like shell features via Java classes.  It is intended for use
// as a portable shell for environments that have JRE 8+ but lack other scripting
// capabilities.

// To use:  invoke Nashorn via "jjs -scripting" then "load('/path/to/lfsh.js')"

var lfpsh = {};
// Import Java classes
lfpsh.System = Java.type('java.lang.System');
lfpsh.File = Java.type('java.io.File');

// global variables
lfpsh.currentDirectory = lfsh.System.getProperty('user.dir');

function env(arg) {
    if (arg === undefined) {
        var envMap = lfpsh.System.getenv();
        for each (var key in envMap.keySet()) {
            print("" + key + "=" + envMap.get(key));  
        }
    } else if (typeof arg === "string") {
        print($ENV[arg])
    }
}

function pwd() {
    print(lfpsh.currentDirectory);
}

function ls(arg) {
    var dir;
    if (arg === undefined) {
        dir = new lfpsh.File(lfsh.currentDirectory);
    } else if (typeof arg === "string") {
        dir = new lfpsh.File(arg);
    }
    var list = dir.list();
    for each (var item in list) {
        print(item);
    }
}
