/*
 * SyntaxHighlighter 3.0 brush for Scheme.
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
        // Scheme
        var defs = 'define '
                + 'define-public define-method define-generic define-procedure'
                + 'define-syntax define-macro'
                + 'define-class'
                + 'define-module';
        var kw = 'begin call-with-current-continuation call/cc'
                + 'call-with-input-file call-with-output-file case cond'
                + 'do else for-each if lambda'
                + 'let let* let-syntax letrec letrec-syntax'
                + 'let-values let*-values'
                + 'and or delay force'
                + 'map syntax syntax-rules';

        function joinWithOr(str) {
            return str
                .replace(/^\s+|\s+$/g, '')
                .replace(/\s+/g, '|');
        }

        function getSchemeKeyword(str) {
            return '\\b(?:' + joinWithOr(str) + ')(?=\\s)';
        }

        function getSchemeKeywordAndName(keyStr) {
            return '\\b(?<keyword>' + joinWithOr(keyStr)
                + ')\\s+\\(?(?<name>[\\w!$%&*+-./:<=>?@^_~]+)';
        }

        function defineProcess(match, regexInfo) {
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

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,
              css: 'string' },
            { regex: new RegExp('([^&][^lg][^t]|^);.*', 'g'), css: 'comments' },
            { regex: new XRegExp(getSchemeKeywordAndName(defs), 'gmi'),
              func: defineProcess },
            { regex: new RegExp(getSchemeKeyword(kw), 'gmi'),
              css: 'keyword' },
            { regex: new RegExp('\\b(?:lambda)(?=\\s)', 'gmi'),
              css: 'keyword' },
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases = ['scheme'];

    SyntaxHighlighter.brushes.Scheme = Brush;

    // CommonJS
    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
