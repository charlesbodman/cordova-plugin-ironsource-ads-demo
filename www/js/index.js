/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var app = {

    consoleOutput: null,

    /**
     * Initializes the app
     */
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    /**
     * Fires when device is ready
     */
    onDeviceReady: function () {
        this.consoleOutput = document.getElementById('console-output');
        this.receivedEvent('deviceready');
        this.initializeIronsource();
        this.bindToButtons();
        this.bindToIronSourceEvents();
    },

    bindToButtons: function () {
        document.getElementById('logo').addEventListener('touchend', this.logoTouched.bind(this));
        document.getElementById('loadInterstitialButton').addEventListener('touchend', this.loadInterstitial.bind(this));
        document.getElementById('showInterstitialButton').addEventListener('touchend', this.showInterstitial.bind(this));
        document.getElementById('showRewardedVideoButton').addEventListener('touchend', this.showRewardedVideo.bind(this));
        document.getElementById('showOfferwallButton').addEventListener('touchend', this.showOfferwall.bind(this));
        document.getElementById('loadBannerButton').addEventListener('touchend', this.loadBanner.bind(this));
        document.getElementById('showBannerButton').addEventListener('touchend', this.showBanner.bind(this));
        document.getElementById('hideBannerButton').addEventListener('touchend', this.hideBanner.bind(this));
        document.getElementById('clearConsoleButton').addEventListener('touchend', this.clearConsole.bind(this));
    },

    receivedEvent: function (event) {
        var consoleOutput = this.consoleOutput;
        consoleOutput.innerHTML += '<br/><b>Event:</b> ' + event;
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    },


    logoTouched: function () {
        this.receivedEvent('IronSource Ads');
    },


    /***************** Iron Source **********************/

    bindToIronSourceEvents: function () {

        var self = this;


        /**
         * Rewarded video events
         */
        window.addEventListener('rewardedVideoAvailabilityChanged', function (event) {
            self.receivedEvent('rewardedVideoAvailabilityChanged : <span class="blue">' + JSON.stringify(event) + '</span>');
        });

        window.addEventListener('rewardedVideoRewardReceived', function (event) {
            self.receivedEvent('rewardedVideoRewardReceived : <span class="blue">' + JSON.stringify(event) + '</span>');
        });

        window.addEventListener('rewardedVideoStarted', function () {
            self.receivedEvent('rewardedVideoStarted');
        });

        window.addEventListener('rewardedVideoEnded', function () {
            self.receivedEvent('rewardedVideoEnded');
        });

        window.addEventListener("rewardedVideoOpened", function () {
            self.receivedEvent('rewardedVideoOpened');
        });

        window.addEventListener('rewardedVideoClosed', function () {
            self.receivedEvent('rewardedVideoClosed');
        });

        window.addEventListener('rewardedVideoFailed', function (event) {
            self.receivedEvent('rewardedVideoFailed : <span class="red">' + JSON.stringify(event) + '</span>');
        });


        /**
         * Offerwall Events
         */
        window.addEventListener('offerwallAvailabilityChanged', function (event) {
            self.receivedEvent('offerwallAvailabilityChanged : <span class="blue">' + JSON.stringify(event) + '</span>');
        });

        window.addEventListener('offerwallShown', function () {
            self.receivedEvent('offerwallShown');
        });

        window.addEventListener('offerwallCreditReceived', function (event) {
            self.receivedEvent('offerwallCreditReceived : <span class="blue">' + JSON.stringify(event) + '</span>');
        });

        window.addEventListener('offerwallCreditFailed', function (event) {
            self.receivedEvent('offerwallCreditReceived : <span class="red">' + JSON.stringify(event) + '</span>');
        });

        window.addEventListener('offerwallClosed', function (event) {
            self.receivedEvent('offerwallClosed');
        });

        window.addEventListener('offerwallShowFailed', function () {
            self.receivedEvent('offerwallCreditFailed : <span class="red">' + JSON.stringify(event) + '</span>');
        });


        /**
         * Interstitial Events
         */
        window.addEventListener('interstitialLoaded', function () {
            self.receivedEvent('interstitialLoaded : <span class="blue">' + JSON.stringify(event) + '</span>');
        });

        window.addEventListener('interstitialShown', function () {
            self.receivedEvent('interstitialShown');
        });

        window.addEventListener('interstitialShowFailed', function (event) {
            self.receivedEvent('interstitialShowFailed : <span class="red">' + JSON.stringify(event) + '</span>');
        });

        window.addEventListener('interstitialClicked', function () {
            self.receivedEvent('interstitialClicked');
        });

        window.addEventListener("interstitialClosed", function () {
            self.receivedEvent('interstitialClosed');
        });

        window.addEventListener("interstitialWillOpen", function () {
            self.receivedEvent('interstitialWillOpen');
        });

        window.addEventListener("interstitialFailedToLoad", function (event) {
            self.receivedEvent('interstitialFailedToLoad : <span class="red">' + JSON.stringify(event) + '</span>');
        });



        /**
         * Banner Events
         */
        window.addEventListener("bannerDidLoad", function (event) {
            self.receivedEvent('bannerDidLoad');
        });

        window.addEventListener("bannerFailedToLoad", function (error) {
            self.receivedEvent('bannerFailedToLoad : <span class="red">' + JSON.stringify(event) + '</span>');
        });

        window.addEventListener("bannerDidClick", function () {
            self.receivedEvent('bannerDidClick');
        });

        window.addEventListener("bannerWillPresentScreen", function () {
            self.receivedEvent('bannerWillPresentScreen');
        });

        window.addEventListener("bannerWillPresentScreen", function () {
            self.receivedEvent('bannerWillPresentScreen');
        });

        window.addEventListener("bannerDidDismissScreen", function () {
            self.receivedEvent('bannerDidDismissScreen');
        });

        window.addEventListener("bannerWillLeaveApplication", function () {
            self.receivedEvent('bannerWillLeaveApplication');
        });


    },

    /**
     * Initializes Ironsource
     */
    initializeIronsource: function () {
        var self = this;
        IronSourceAds.init({
            appKey: 'ENTER YOUR KEY HERE',
            onSuccess: function () {
                self.receivedEvent('Initialized');
                IronSourceAds.validateIntegration();
            },
            onFailure: function () {
                self.receivedEvent('Failed to initialize');
            }
        });

    },

    /**
     * Shows rewarded video
     */
    showRewardedVideo: function () {
        var self = this;
        IronSourceAds.showRewardedVideo({
            onSuccess: function () {
                self.receivedEvent('Showing rewarded video...');
            },
            onFailure: function (error) {
                self.receivedEvent('Show rewarded video failed : <span class="red">' + JSON.stringify(error) + '</span>');
            }
        });
    },

    /**
     * Loads interstitial
     */
    loadInterstitial: function () {
        var self = this;
        IronSourceAds.loadInterstitial({
            onSuccess: function () {
                self.receivedEvent('Loading interstitial...');
            },
            onFailure: function (error) {
                self.receivedEvent('Loading intersitital failed : <span class="red">' + JSON.stringify(error) + '</span>');
            }
        });
    },

    /**
     * Shows intersitital if loaded
     */
    showInterstitial: function () {
        var self = this;
        IronSourceAds.showInterstitial({
            onSuccess: function () {
                self.receivedEvent('Showing interstitial...')
            },
            onFailure: function (error) {
                self.receivedEvent('Showing intersitital failed : <span class="red">' + JSON.stringify(error) + '</span>');
            }
        });
    },

    /**
     * Show Offerwall
     */
    showOfferwall: function () {
        var self = this;
        IronSourceAds.showOfferwall({
            onSuccess: function () {
                self.receivedEvent('Showing offerwall...')
            },
            onFailure: function (error) {
                self.receivedEvent('Showing offerwall failed : <span class="red">' + JSON.stringify(error) + '</span>');
            }
        });
    },

    loadBanner: function () {
        var self = this;
        IronSourceAds.loadBanner({
            onSuccess: function () {
                self.receivedEvent('Loading banner...')
            },
            onFailure: function (error) {
                self.receivedEvent('Loading banner failed : <span class="red">' + JSON.stringify(error) + '</span>');
            }
        });
    },

    showBanner: function () {
        var self = this;
        IronSourceAds.showBanner({
            onSuccess: function () {
                self.receivedEvent('Showing banner...')
            },
            onFailure: function (error) {
                self.receivedEvent('Showing banner failed : <span class="red">' + JSON.stringify(error) + '</span>');
            }
        });
    },

    hideBanner: function () {
        var self = this;
        IronSourceAds.hideBanner({
            onSuccess: function () {
                self.receivedEvent('Hiding Banner')
            },
            onFailure: function (error) {
                self.receivedEvent('Hiding banner failed : <span class="red">' + JSON.stringify(error) + '</span>');
            }
        });
    },


    clearConsole: function () {
        this.consoleOutput.innerHTML = '';
    }


};



app.initialize();