'use strict';

module.exports = function (grunt) {
    //タスクの定義
    grunt.registerMultiTask('mytask', 'my local task.', function () {

        var source = this.data.src;
        var dest = this.data.dest;

        var org = grunt.file.read(source);
        var sourceArray = org.split(/\r\n|\r|\n/);

        var jsonStr = getProperty(sourceArray);


        grunt.log.writeln("--------");
        grunt.log.writeln(jsonStr);
        grunt.log.writeln("--------");


        var obj = (new Function("return " + jsonStr))();

        // grunt.log.writeln(obj);
        // grunt.log.writeln(obj.param1);
        // grunt.log.writeln(obj.param2);


        var sql = getSQL(obj);

        grunt.log.writeln(sql);


    });

    var getProperty = function (sourceArray) {

        var startStr = '"start"';
        var endStr = '"end"';

        var startRe = new RegExp(startStr, "i");
        var endRe = new RegExp(endStr, "i");

        var flag = false;

        var returnArray = [];
        for (var i in sourceArray) {
            var source = sourceArray[i];
            // grunt.log.writeln(source);


            if (flag) {
                if (!endRe.test(source)) {
                    returnArray.push(source);
                }
            }

            if (startRe.test(source)) {
                // grunt.log.writeln("startRe");
                flag = true;
            }
            if (endRe.test(source)) {
                // grunt.log.writeln("endRe");
                flag = false;
            }

        }
        returnArray.unshift('{');
        returnArray.push('}');
        return returnArray.join('');

    }


    var getSQL = function (obj) {
        var result0 = [
            'insert into xxx ('
        ];

        var keys = '';
        var values = '';
        for (var key in obj) {
            keys += "'" + key + "',";
            values += "'" + obj[key] + "',";
        }

        keys = keys.substr(0, keys.length - 1);
        values = values.substr(0, values.length - 1);

        var result1 = [
            ') values ('
        ];


        var result2 = [
            ')'
        ];


        var result = result0.concat(keys).concat(result1).concat(values).concat(result2).join('');

        return result;
    }
};


// angular.module(APP_NAME)
//     .value('constValue', {
//         // "start"
//         'param1': 'value1',
//         'param2': 'value2',
//         'param3': 'value2'
//         // "end"
//     });

// mytask: {
//     develop: {
//         src: 'app/scripts/controllers/hoge.js',
//             dest: 'param.js'
//     }
// },