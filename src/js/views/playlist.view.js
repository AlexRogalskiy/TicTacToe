'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import PlaylistItemView from 'views/playlist-item.view';

const headerStyle = {
  color: "#333",
  fontFamily: "monospace",
  fontSize: "32",
};

type PlaylistItem = {
	id: string;
	className?: string;
};
type Props = {
	items?: Array<PlaylistItem>;
	onClick?: func;
	children?: Node;
};

const PlaylistView = (props: Props): Node => (
  <table class={props.className}>
    <thead style={headerStyle}>
      <tr>
        <th>Title</th>
        <th>Artist</th>
      </tr>
    </thead>
    <tbody>
    {
      props.items.map((item: PlayListItem): Node => (
        <PlaylistItemView
          item={item}
          onClick={props.onClick}
        />
      ))
    }
    </tbody>
  </table>
);

export default PlaylistView;