'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import CodeMirror from 'codemirror';

import { Elements, Stylesheets } from 'libs/elements.lib';
import { isString } from 'libs/helpers.lib';
import DocumentBoxElement from 'components/elements/document-box.element';

/* @flow */
type Props = {
	initialCode?: string;
	children?: Node;
};
type State = {
	keyword?: string;
};

export default class EditorElement extends Component<Props, State> {
  displayName: string = 'EditorElement';

  view: ?HTMLElement;

  state: State = {
	  keyword: ''
  };
  
  static defaultProps: Props = {
	className: 'editor'
  };

  componentDidMount(): void {
    var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
      mode: 'javascript',
      theme: 'neo',
      tabSize: 2,
      keyMap: 'basic',
      viewportMargin: Infinity
    });
    editor.focus();

    editor.on('change', () => {
      this.props.onChange(editor.getValue());
    });
	
    editor.on('cursorActivity', () => {
      var pos = editor.getCursor();
      var line = editor.getLine(pos.line);
      for (var end = pos.ch; end < line.length; end++) {
        if (!line[end].match(/\w/)) {
          break;
        }
      }
      for (var start = pos.ch - 1; start >= 0; start--) {
        if (!line[start].match(/\w/)) {
          break;
        }
      }
      var keyword = line.substring(start + 1, end);
      this.setState({ keyword });
    });
    this.editor = editor;
  }

  editLine(value: string): void {
    let {line, ch} = this.editor.getCursor();
    let original = this.editor.getLine(line);
    let text = isString(value) ? `'${value}'` : value + '';
    let replacement = original.replace(/: .+$/, `: ${text},`);
    this.editor.replaceRange(replacement, {line, ch: 0}, {line, ch: original.length}, 'cats');
    this.editor.setCursor({line, ch});
    this.editor.focus();
  }

  render(): Node {
    return (
      <Elements.View ref={view => (this.view = view)} style={[styles.code]}>
        <textarea id="code" defaultValue={this.props.initialCode} />
        <DocumentBoxElement
          keyword={this.state.keyword}
          onChangeValue={this.editLine}
        />
      </Elements.View>
	);
  }
};

const styles = Stylesheets.create({
  code: {
    display: 'flex',
    position: 'relative',
    flex: 4,
    backgroundColor: '#F5F5FF',
    justifyContent: 'center',
    flexDirection: 'column',
    overflow: 'scroll',
    paddingLeft: 20,
    borderLeft: 'solid 1px #ccc',
  }
});