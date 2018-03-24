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
lfpsh.ScriptEngineManager = Java.type('javax.script.ScriptEngineManager');
lfpsh.ScriptEngine = new lfpsh.ScriptEngineManager().getEngineByName('nashorn');
lfpsh.ScriptContext = lfpsh.ScriptEngine.getContext();
//lfpsh.GlobalBindings = lfpsh.ScriptContext.getBindings(lfpsh.ScriptContext.GLOBAL_SCOPE);
//lfpsh.LocalBindings = lfpsh.ScriptContext.getBindings(lfpsh.ScriptContext.ENGINE_SCOPE);

// global variables
lfpsh.currentDirectory = lfpsh.System.getProperty('user.dir');
lfpsh.homeDirectory = lfpsh.System.getProperty('user.home');
lfpsh.userName = lfpsh.System.getProperty('user.name');
lfpsh.fs = lfpsh.System.getProperty('file.separator');

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
        dir = new lfpsh.File(lfpsh.currentDirectory);
    } else if (typeof arg === "string") {
        dir = new lfpsh.File(arg);
    }
    var list = dir.list();
    for each (var item in list) {
        print(item);
    }
}

function cd(arg) {
    if (arg === undefined) {
        lfpsh.currentDirectory = lfpsh.homeDirectory;
    } else if (typeof arg === "string") {
        var path = new lfpsh.File(arg);
        if (path.isDirectory()) {
            lfpsh.currentDirectory = path.getAbsolutePath();
        } else {
            path = new lfpsh.File(lfpsh.currentDirectory + lfpsh.fs + arg);
            if (path.isDirectory()) {
                lfpsh.currentDirectory = path.getAbsolutePath();
            } else {
                print("${arg} is not a directory!");
            }
        }
    }
}
