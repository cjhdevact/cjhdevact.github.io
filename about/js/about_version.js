// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import{sendWithPromise}from"chrome://resources/js/cr.js";import{loadTimeData}from"chrome://resources/js/load_time_data.js";import{getRequiredElement}from"chrome://resources/js/util.js";import{addWebUiListener}from"chrome://resources/js/cr.js";function handleVariationInfo({variationsList:variationsList,variationsCmd:variationsCmd}){getRequiredElement("variations-section").hidden=!variationsList.length;for(const item of variationsList){getRequiredElement("variations-list").appendChild(document.createTextNode(item));getRequiredElement("variations-list").appendChild(document.createElement("br"))}if(variationsCmd){getRequiredElement("variations-cmd-section").hidden=!variationsCmd;getRequiredElement("variations-cmd").textContent=variationsCmd}}function handlePathInfo({execPath:execPath,profilePath:profilePath}){getRequiredElement("executable_path").textContent=execPath;getRequiredElement("profile_path").textContent=profilePath}function returnOsVersion(osVersion){getRequiredElement("os_version").textContent=osVersion}function copyToClipboard(){navigator.clipboard.writeText(getRequiredElement("copy-content").innerText).then(announceCopy)}function announceCopy(){const messagesDiv=getRequiredElement("messages");messagesDiv.innerHTML=window.trustedTypes.emptyHTML;const div=document.createElement("div");div.innerText=loadTimeData.getString("copy_notice");messagesDiv.append(div)}function initialize(){addWebUiListener("return-os-version",returnOsVersion);chrome.send("requestVersionInfo");const includeVariationsCmd=location.search.includes("show-variations-cmd");sendWithPromise("requestVariationInfo",includeVariationsCmd).then(handleVariationInfo);sendWithPromise("requestPathInfo").then(handlePathInfo);if(getRequiredElement("variations-seed").textContent!==""){getRequiredElement("variations-seed-section").hidden=false}if(getRequiredElement("sanitizer").textContent!==""){getRequiredElement("sanitizer-section").hidden=false}getRequiredElement("copy-to-clipboard").addEventListener("click",copyToClipboard)}document.addEventListener("DOMContentLoaded",initialize);