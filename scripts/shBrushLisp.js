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
        var fdefs = 'defgeneric define-compiler-macro define-condition'
                + ' define-method-combination define-modify-macro'
                + ' define-setf-expander defmacro defmethod defsetf'
                + ' defsubst defun';
        var tdefs = 'defclass defpackage defstruct deftype';
        var vdefs = 'defconstant define-symbol-macro defparameter defvar';
        var kw = 'block break case ccase compiler-let cond condition-case'
                + ' ctypecase declaim declare destructuring-bind do do*'
                + ' dolist dotimes ecase etypecase eval-when flet go'
                + ' handler-bind handler-case if ignore-errors in-package'
                + ' labels lambda let let* letf locally loop macrolet'
                + ' multiple-value-bind multiple-value-prog1 proclaim prog'
                + ' prog* prog1 prog2 progn progv restart-bind restart-case'
                + ' return return-from symbol-macrolet tagbody the typecase'
                + ' unless unwind-protect when while with-accessors'
                + ' with-accessors with-compilation-unit'
                + ' with-condition-restarts with-hash-table-iterator'
                + ' with-input-from-string with-open-file with-open-stream'
                + ' with-output-to-string with-package-iterator'
                + ' with-simple-restart with-slots with-standard-io-syntax';
        var errs = 'abort assert cerror check-type error signal warn';

        function joinWithOr(str) {
            return str
                .replace(/^\s+|\s+$/g, '')
                .replace(/\s+/g, '|');
        }

        function getLispKeyword(str) {
            return '\\b(?:' + joinWithOr(str) + ')(?=\\s)';
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

        function typeProcess(match, regexInfo) {
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
                                            'color2'));
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
            { regex: new XRegExp(getLispKeywordAndName(tdefs), 'gmi'),
              css: typeProcess },
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
