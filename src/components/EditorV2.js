import React from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import createHighlightPlugin from "../plugins/highlightPlugin";
import addLinkPlugin from "../plugins/addLinkPlugin";

const highlightPlugin = createHighlightPlugin();

class EditorV2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.plugins = [highlightPlugin, addLinkPlugin];
  }

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  }

  onItalicClick() {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  }
  onStrikethroughClick() {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "STRIKETHROUGH")
    );
  }

  onUnderlineClick() {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  }

  onBlockquoteClick() {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "BLOCKQUOTE")
    );
  }

  onUnorderedList() {
    this.onChange(
      RichUtils.toggleBlockType(this.state.editorState, "unordered-list-item")
    );
  }

  onOrderedList() {
    this.onChange(
      RichUtils.toggleBlockType(this.state.editorState, "ordered-list-item")
    );
  }

  onHighlight() {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "HIGHLIGHT")
    );
  }

  onAddLink = () => {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    const link = window.prompt("Paste the link -");
    if (!link) {
      this.onChange(RichUtils.toggleLink(editorState, selection, null));
      return "handled";
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
      url: link
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      "create-entity"
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
  };

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  render() {
    return (
      <div className="main-container-editor-v2">
        <h1>Write something!</h1>

        <div className="editor2-wrapper collection-editor-v2">
          <button
            className="styleButtons waves-effect btn-small white lighten-4"
            onClick={this.onBoldClick.bind(this)}
          >
            B
          </button>

          <button
            className="styleButtons waves-effect btn-small white lighten-4"
            onClick={this.onItalicClick.bind(this)}
          >
            I
          </button>

          <button
            className="styleButtons waves-effect btn-small white lighten-4"
            onClick={this.onStrikethroughClick.bind(this)}
          >
            <s>abc</s>
          </button>
          <button
            className="styleButtons waves-effect btn-small white lighten-4"
            onClick={this.onUnderlineClick.bind(this)}
          >
            <u>U</u>
          </button>
          <button
            className="styleButtons waves-effect btn-small white lighten-4"
            onClick={this.onBlockquoteClick.bind(this)}
          >
            " "
          </button>

          <button
            className="styleButtons waves-effect btn-small white lighten-4"
            onClick={this.onUnorderedList.bind(this)}
          >
            UL
          </button>

          <button
            className="styleButtons waves-effect btn-small white lighten-4"
            onClick={this.onOrderedList.bind(this)}
          >
            OL
          </button>
          <button
            className="styleButtons waves-effect btn-small white lighten-4"
            onClick={this.onHighlight}
          >
            <span style={{ background: "yellow" }}>H</span>
          </button>
          <button
            className="styleButtons waves-effect btn-small white lighten-4"
            onClick={this.onAddLink}
          >
            <i className="tiny material-icons">attach_file</i>
          </button>
        </div>

        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          plugins={this.plugins}
        />
      </div>
    );
  }
}

export default EditorV2;
