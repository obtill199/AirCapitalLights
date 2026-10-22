# Air Capital Lights

One-page website and booking form for Air Capital Lights, a veteran-owned Christmas
light installer in Wichita, KS. Hosted free on GitHub Pages at
https://obtill199.github.io/AirCapitalLights/

## Turn on the site (once)

1. On GitHub, open this repo's **Settings → Pages**.
2. Under **Build and deployment**, set Source to **Deploy from a branch**, branch
   **main**, folder **/ (root)**, then **Save**.
3. Wait about a minute, then open the link above.

## Send bookings to a Google Sheet

Until this is set up, the form opens a pre-filled text message to (785) 214-8759
when someone books.

1. Open [script.google.com](https://script.google.com) and click **New project**.
2. Delete the starter code and paste `apps-script/booking-endpoint.gs`.
3. Choose `setup` in the function menu, click **Run**, and approve the permission
   prompt. The Execution log prints your Bookings sheet link.
4. Click **Deploy → New deployment**, pick **Web app**, set **Execute as: Me** and
   **Who has access: Anyone**, then **Deploy**. Copy the Web app URL.
5. Paste the URL into `BOOKING_ENDPOINT` near the bottom of `index.html`, commit, and push.

Each booking then adds a row to the sheet and emails you.

## Change prices

Prices live in two places in `index.html`: the price table near the top and the
`PRICES` object in the script at the bottom. Change both.

## Offer and image

One-story supplied-light packages are priced on the site; footage limits
(70 / 120 / 180 ft) are checked when quoting. Two-story homes,
complex rooflines, and customer-owned lights receive a custom quote. One $20
promotion applies per home per season. Supplied lights remain company property.

The site no longer shows the AI-generated images in `assets/` (kept for reference).
The hero is an inline SVG strand of C9 bulbs that switch between warm white,
multicolor, and red & white with the color buttons and the form's color choice. Swap in a real photo of an install when you have one.

The initial request asks for contact details and package preferences. Timing,
referral source, neighbor details, and extras are confirmed during text follow-up.
Existing endpoint field names are preserved for compatibility.

## Color preferences

The request form offers warm white, multicolor, red and white, and help choosing.
Color preference is prepended to the existing notes field, so the deployed
Google Sheet/email endpoint records it without a redeployment or new column.
