// Copyright 2016 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
export class PromiseResolver{resolve_=()=>{};reject_=()=>{};isFulfilled_=false;promise_;constructor(){this.promise_=new Promise(((resolve,reject)=>{this.resolve_=resolution=>{resolve(resolution);this.isFulfilled_=true};this.reject_=reason=>{reject(reason);this.isFulfilled_=true}}))}get isFulfilled(){return this.isFulfilled_}get promise(){return this.promise_}get resolve(){return this.resolve_}get reject(){return this.reject_}}