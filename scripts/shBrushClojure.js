/*
 * SyntaxHighlighter 3.0 brush for Clojure.
 * Copyright (C) 2015, Byungwan Jun.
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
        // Clojure
        var fdefs = 'defn defn- defmulti defmacro definline';
        var tdefs = 'defstruct deftype defprotocol defrecord';
        var vdefs = 'def defonce';
        var kw = 'do if let let\\* var fn fn\\* loop loop\\*'
                + ' recur throw try catch finally'
                + ' set! new \\.'
                + ' monitor-enter monitor-exit quote'
                + ' letfn case cond cond-> cond->> condp'
                + ' for when when-not when-let when-first when-some'
                + ' if-let if-not if-some'
                + ' \\.\\. -> ->> as-> doto and or'
                + ' dosync doseq dotimes dorun doall'
                + ' ns in-ns'
                + ' with-open with-local-vars binding'
                + ' with-redefs with-redefs-fn'
                + ' declare'
                + ' true false nil';

        function joinWithOr(str) {
            return str
                .replace(/^\s+|\s+$/g, '')
                .replace(/\s+/g, '|');
        }

        function getClojureKeyword(str) {
            return '\\b(?:' + joinWithOr(str) + ')(?=\\s)';
        }

        function getClojureKeywordAndName(keyStr) {
            return '\\b(?<keyword>' + joinWithOr(keyStr)
                + ')\\s+(?<name>[\'`]?[\\w!$%&*+-./:<=>?@^_~]+)';
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
            { regex: SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,
              css: 'string' },
            { regex: new RegExp('(^(?!.*&(lt|gt|amp))|\\s+|^);.*', 'g'), css: 'comments' },
            { regex: new RegExp('&amp;[^\\s]+', 'g'), css: 'keyword' },
            { regex: new XRegExp(getClojureKeywordAndName(fdefs), 'gmi'),
              func: functionProcess },
            { regex: new XRegExp(getClojureKeywordAndName(tdefs), 'gmi'),
              func: typeProcess },
            { regex: new XRegExp(getClojureKeywordAndName(vdefs), 'gmi'),
              func: variableProcess },
            { regex: new RegExp(getClojureKeyword(kw), 'gmi'),
              css: 'keyword' },
            { regex: new RegExp('\\b(?:fn)(?=\\s)', 'gmi'),
              css: 'keyword' },
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases = ['clojure'];

    SyntaxHighlighter.brushes.Clojure = Brush;

    // CommonJS
    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
