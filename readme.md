# StackPath

## Introduction
The StackPath Toolkit provides the necessary elements to dynamically integrate StackPath with MODX. There are five elements to the toolkit:

* __Rules Manager__: The Rules Manager allows for frontend rules to be specified via a regular expression syntax. These rules will allow the targetted link structures (such as src or href attributes) to be rewritten to point to your CDN URL.
* __StackPath Linker Plugin__: The StackPath Linker plugin accesses the rules specified in the Rules Manager and dynamically rewrites the link structures on the frontend. See the Selective Caching section below.
* __StackPath Purge on Clear Cache Plugin__: The Purge Cache plugin will send a 'purge all' request to StackPath when using the Clear Cache menu option in the MODX Manager. This plugin can be enabled or disabled via the _scdn.purge_on_clear_cache_ system setting.
* __StackPath Manager Plugin__: The StackPath Manager plugin provides advanced manager integration. By default, this is disabled on install due to it's specific usage requirements.
* __Purge Tool__: A simple form-based Purge tool allowing either a full purge of the StackPath site or selective purging of individual files.

## Pre-Requisites
The following pre-requisites are required prior to installation:

* You have signed up for StackPath and have your StackPath site setup from within their control panel.
* You have created an API application within StackPath's control panel
* PHP 5.3 or above

## Installation
On installation of the StackPath component, have the following pieces of information available to expedite the setup:

* Your Site ID
* Your Consumer Key/Secret pair
* Your default CDN URL (the StackPath generated CDN URL, xxx-yyy.stackpathdns.com)

__Note: It is recommended that you initially select the _disabled_ option on install otherwise the StackPath Linker plugin will be immediately active which may not be desired. Once the component is installed, you can check settings, make any configuration or rule changes and then enable the StackPath integration.__ 

## Default Rules
For the purpose of documentation or if you do not select the 'Install Default Rules' option on install and later decide you want to use them, here are the default rules shipped with the StackPath Toolkit:

__1. Site URL src and href links__

Replace src and href links that start with the site URL.

* Input Rule: ``((?:<(?:a|link|img|script)\b)(?:[^>]+)(?:href|src)=")(?:{site_url})([^>]+\.(?:jpe?g|png|gif|svg|xml|js|css)")``
* Output Format: ``{match1}{cdn_url}{match2}``

__2. Base URL src and href links__

Replace src and href links that start with the base URL.

* Input Rule: ``((?:<(?:a|link|img|script)\b)(?:[^>]+)(?:href|src)=")(?:{base_url})([^/][^>]+\.(?:jpe?g|png|gif|svg|xml|js|css)")``
* Output Format: ``{match1}{cdn_url}{match2}``

__3. Relative URL src and href links__

Replace relative src and href links.

* Input Rule: ``((?:<(?:a|link|img|script)\b)(?:[^>]+)(?:href|src)=")(?!(?:https?|/))([^>]+\.(?:jpe?g|png|gif|svg|xml|js|css)")``
* Output Format: ``{match1}{cdn_url}{match2}``

## Web fonts

If you want to cache web fonts via StackPath, you can add the extensions to the default rules above but please enable the 'Add CORS Header' option for the StackPath site in their control panel.

## SSL Support

When adding a rule, you can select the scheme to use for the CDN URL from one of the following: HTTP, HTTPS, or Schemeless.

When installing StackPath and selecting to install the default rules is to have the rules use HTTPS (because all default StackPath already have shared SSL enabled). You really should make use of this option unless you have a specific need to stick with HTTP. Remember, if using a custom domain, you must upload a valid SSL Certificate/Key to the site using their control panel to be able to use HTTPS.
