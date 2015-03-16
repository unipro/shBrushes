/*
 * SyntaxHighlighter 3.0 brush for Lisp.
 * Copyright (C) 2015, Daniel Jun.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General
 * Public License along with this library; if not, see
 * <http://www.gnu.org/licenses/>.
 */

;(function() {
    // CommonJS
    SyntaxHighlighter = (SyntaxHighlighter
                         || (typeof require !== 'undefined'
                             ? require('shCore').SyntaxHighlighter
                             : null));

    function Brush() {
        var fdefs = 'defmacro defsubst defun';
        var vdefs = 'defvar defparameter';
        var kw = 'cond if while let let* progn prog1 prog2 lambda'
                + ' unwind-protect condition-case when unless'
                + ' with-output-to-string ignore-errors dotimes dolist'
                + ' declare';
        var errs = 'warn error signal';

        function joinWithOr(str) {
            return str
                .replace(/^\s+|\s+$/g, '')
                .replace(/\s+/g, '|');
        }

        function getLispKeyword(str) {
            str = joinWithOr(str);
            return '\\b(?:' + str + ')(?=\\s)';
        }

        function getLispKeywordAndName(str) {
            return '\\b(?<keyword>' + joinWithOr(str)
                + ')\\s+(?<name>(?:\\w|-)+)';
        }

        function functionProcess(match, regexInfo) {
            var constructor = SyntaxHighlighter.Match;
            var result = [];

            if (match.keyword != null) {
                result.push(new constructor(match.keyword,
                                            match.index + match[0].indexOf(match.keyword),
                                            'keyword'));
            }

            if (match.name != null) {
                result.push(new constructor(match.name,
                                            match.index + match[0].lastIndexOf(match.name),
                                            'functions'));
            }

            return result;
        }

        function variableProcess(match, regexInfo) {
            var constructor = SyntaxHighlighter.Match;
            var result = [];

            if (match.keyword != null) {
                result.push(new constructor(match.keyword,
                                            match.index + match[0].indexOf(match.keyword),
                                            'keyword'));
            }

            if (match.name != null) {
                result.push(new constructor(match.name,
                                            match.index + match[0].lastIndexOf(match.name),
                                            'variable'));
            }

            return result;
        }

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,
              css: 'string' },
            { regex: new RegExp(';.*', 'g'), css: 'comments' },

            { regex: new XRegExp(getLispKeywordAndName(fdefs), 'gmi'),
              func: functionProcess },
            { regex: new XRegExp(getLispKeywordAndName(vdefs), 'gmi'),
              css: variableProcess },
            { regex: new RegExp(getLispKeyword(kw), 'gmi'),
              css: 'keyword' },
            { regex: new RegExp(getLispKeyword(errs), 'gmi'),
              css: 'keyword' },
            { regex: new RegExp('\\b(?:lambda)(?=\\s)', 'gmi'),
              css: 'keyword' },
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases = ['lisp', 'elisp'];

    SyntaxHighlighter.brushes.Lisp = Brush;

    // CommonJS
    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
