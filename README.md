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
