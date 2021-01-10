// go to https://onlinetexttools.com/escape-text to update

const ARTICLE_TEXT = "<!-- Start of an article preview -->\n<!-- Thumbnail <mj-section full-width=\"full-width\" background-color=\"#ffffff\" padding-bottom=\"0\">\n  <mj-column width=\"100%\">\n    <mj-image src=\"%Thumbnail\" width=\"600px\" alt=\"\" padding=\"0\" href=\"%Link\" />\n  </mj-column>\n</mj-section> Thumbnail -->\n<!-- Start of text -->\n<mj-section background-color=\"#ffffff\" padding-left=\"15px\" padding-right=\"15px\">\n  <mj-column width=\"100%\">\n    <!-- Credit <mj-text color=\"#637381\" font-size=\"12px\" align=right padding-right=\"5px\">\n      %Credit\n    </mj-text> Credit -->\n    <!-- Caption <mj-text color=\"#637381\" font-size=\"12px\" align=left padding-left=\"5px\">\n      <i>%Caption</i>\n    </mj-text> Caption -->\n    <mj-text color=\"#212b35\" font-weight=\"bold\" font-size=\"20px\">\n      %Title\n    </mj-text>\n    <mj-text color=\"#212b35\" font-size=\"12px\" height=15px font-weight=\"bold\">\n      %Author\n    </mj-text>\n    <mj-text color=\"#637381\" font-size=\"16px\">\n      %Preview\n    </mj-text>\n    <mj-button background-color=\"#202F5A\" align=\"center\" color=\"#ffffff\" font-size=\"17px\" font-weight=\"bold\" href=\"%Link\" width=\"300px\">\n      Continue Reading\n    </mj-button>\n  </mj-column>\n</mj-section>\n<!-- End of text-->\n<!-- End of an article -->\n"

const MAIN_TEXT = `<mjml>
  <mj-head>
    <!-- Title and Date -->
    <mj-title>Off the Record - %Month %DD, %YYYY</mj-title>
    <!-- Description -->
    <mj-preview>%Description</mj-preview>
    <mj-attributes>
      <mj-all font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"></mj-all>
      <mj-text font-weight="400" font-size="16px" color="#000000" line-height="24px" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"></mj-text>
    </mj-attributes>
    <mj-style inline="inline">
      .body-section { -webkit-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); -moz-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); }
    </mj-style>
    <mj-style inline="inline">
      .text-link { color: #5e6ebf }
    </mj-style>
    <mj-style inline="inline">
      .footer-link { color: #888888 }
    </mj-style>
  </mj-head>
  <mj-body background-color="#E7E7E7" width="600px">
    <!-- BODY CONTENT -->
    <mj-section full-width="full-width" background-color="#02174c" padding-bottom="0">
      <mj-column width="100%">
        <mj-image src="https://graphics.thehr.org/newsletter/spring_2020_header.png" alt="" align="center" width="800px" />
        <mj-text color="#ffffff" font-weight="bold" align="center" text-transform="uppercase" font-size="16px" letter-spacing="1px" padding-top="30px">
          <!-- Date -->
          %Weekday, %Month %DD, %YYYY
          <br/>
          <span style="color: #979797; font-weight: normal">-</span>
        </mj-text>
        <mj-text color="#17CBC4" align="center" font-size="13px" padding-top="0" font-weight="bold" text-transform="uppercase" letter-spacing="1px" line-height="30px">
          Lakeville, CT
        </mj-text>
        <mj-text></mj-text>
      </mj-column>
    </mj-section>
    <mj-wrapper padding-top="0" padding-bottom="0" css-class="body-section">
      <!-- TEXT CONTENT -->
      <mj-section background-color="#ffffff" padding-left="15px" padding-right="15px">
        <mj-column width="100%">
          <mj-text color="#637381" font-size="16px">
            %Editorial
            <br/><br/> - <i>The Record Executive Board</i>
          </mj-text>
        </mj-column>
      </mj-section>
      %Articles
      <!-- Footer -->
      <mj-section>
        <mj-column width="100%" padding="0">
          <mj-text color="#212b35" font-weight="bold" font-size="20px">
            Errata
          </mj-text>
            %Errata
          <mj-text color="#445566" font-size="11px" font-weight="bold">
            <a href="https://thehr.org/corrections">Issue a correction for a previous issue.</a><br/>
            <a href="https://hotchkissrecord.org/errata/">View an up-to-date list of the errors we are currently aware of.</a>
          </mj-text>
          <mj-text color="#212b35" font-weight="bold" font-size="20px">
            Contact Us
          </mj-text>
          <mj-text color="#445566" font-size="11px" font-weight="bold">
            Do you have an idea you would like us to cover?
            <a href="https://hotchkissrecord.org/contact/">Contact us or submit an anonymous tip.</a>
          </mj-text>
          <mj-social font-size="15px" icon-size="30px" mode="horizontal" padding="0" align="center">
            <mj-social-element name="instagram" href="https://www.instagram.com/hotchkissrecord/" background-color="#A1A0A0">
            </mj-social-element>
            <mj-social-element name="web" href="https://hotchkissrecord.org/" background-color="#A1A0A0">
            </mj-social-element>
          </mj-social>
          <mj-text color="#445566" font-size="11px" font-weight="bold" align="center">
            <a href="https://newsletter.thehr.org/%YYYYMMDD/index.html">View this email in your browser.</a>
          </mj-text>
          <mj-text color="#445566" font-size="11px" font-weight="bold" align="center">
            Were you sent this briefing by a friend?
            <a href="https://subscribe.thehr.org/">Subscribe here.</a>
          </mj-text>
          <mj-text color="#445566" font-size="11px" align="center" line-height="16px">
            Copyright © %YYYY The Hotchkiss Record, All rights reserved. You are receiving this email because you are a member of the Hotchkiss community, or because you signed up on our website.
          </mj-text>
          <mj-text color="#445566" font-size="11px" align="center" line-height="16px">
            <b>Our mailing address is:</b><br/> The Hotchkiss Record <br/> 11 Interlaken Rd <br/> Lakeville, CT 06039-2141
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section padding-top="0">
        <mj-group>
          <mj-column width="100%" padding-right="0">
            <mj-text color="#445566" font-size="11px" align="center" line-height="16px" font-weight="bold">
            </mj-text>
          </mj-column>
        </mj-group>
      </mj-section>
    </mj-wrapper>
  </mj-body>
</mjml>
`
