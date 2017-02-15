/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Utility functions for handling procedures.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Search');

goog.require('Blockly.Blocks');
goog.require('Blockly.Field');
goog.require('Blockly.Names');
goog.require('Blockly.Workspace');
goog.require('Blockly.Toolbox');
goog.require('goog.ui.tree.TreeNode');
goog.require('goog.ui.tree.TreeControl');


/**
 * Category to separate procedure names from variables and generated functions.
 */
Blockly.Search.NAME_TYPE = 'SEARCH';

Blockly.Search = function(node,workspace){
	this.SEARCH_TERM = '';
	
	this.allBlocks = [];
	
	//assemble all blocks in the toolbox
	var treeIn = node.getParent();
	var searchNode = {};
	for (var i = 0; i < treeIn.getChildren().length; i++) {
		console.log("Hello " + treeIn.getChildren()[i].getHtml().toUpperCase());
		if ((treeIn.getChildren()[i].getHtml().toUpperCase()) == "SEARCH"){
			searchNode = treeIn.getChildren()[i];
			console.log("Condition is true");
			break;
		}
	}
	searchNode.blocks = [];
	this.addSearchBlocks(treeIn,searchNode);
	
	for(var i = 0; i < searchNode.blocks.length; i++){
		
	}
};

/**Go through tree recursively and add blocks to the searchNode*/
Blockly.Search.addSearchBlocks = function(treeIn, searchNode){
	if(!treeIn.hasChildren()) return;
	for(var i = 0; i < treeIn.getChildren().length; i++){
		var childIn = treeIn.getChildren()[i];
		
		console.log(childIn.getHtml().toUpperCase());
		var childName = childIn.getHtml().toUpperCase();
		if(childName == "SEARCH" || childName == "VARIABLE" || childName == "PROCEDURE") continue;	
		
		if(childIn.blocks && childIn.blocks.length > 0){
			console.log("Length of block array" + childIn.blocks.length);
			for (var j = 0; j < childIn.blocks.length; j++) {
				searchNode.blocks.push(childIn.blocks[j]);
				console.log("Pushed " + childIn.blocks[j]);
			}
		}
		this.addSearchBlocks(childIn, searchNode);
	}
};

/**Find node for SEARCH category*/
Blockly.Search.flyoutCategory = function(node, workspace) {
    var treeIn = node.getParent();
	var searchNode = {};
	for (var i = 0; i < treeIn.getChildren().length; i++) {
		console.log("Hello " + treeIn.getChildren()[i].getHtml().toUpperCase());
		if ((treeIn.getChildren()[i].getHtml().toUpperCase()) == "SEARCH"){
			searchNode = treeIn.getChildren()[i];
			console.log("Condition is true");
			break;
		}
	}
	searchNode.blocks = [];

  var button = goog.dom.createDom('button');
  button.setAttribute('text', Blockly.Msg.NEW_SEARCH);
  button.setAttribute('callbackKey', 'CREATE_SEARCH');

  workspace.registerButtonCallback('CREATE_SEARCH', function(button) {
    Blockly.Search.createSearch(button.getTargetWorkspace());
  });

  searchNode.blocks.push(button);
	this.addSearchBlocks(treeIn,searchNode);
        return searchNode.blocks;
};

Blockly.Search.createSearch = function(workspace, opt_callback) {
  var userChoice = Blockly.prompt("Enter search phrase", "");
  // search functionality
          if (opt_callback) {
            opt_callback(null);
          }
  };
