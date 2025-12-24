---
title: Showroom
---

<p>A schema describing a car dealer showroom</p>
<h2>Primary Key</h2>
<p>
  <code>id</code>
</p>
<h2>Fields</h2>
<table>
  <colgroup>
    <col width="20%"/>
    <col width="65%"/>
    <col width="15%"/>
  </colgroup>
  <thead>
    <tr>
      <th>Name</th>
      <th>Definition</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td id="id">
        <code>
          <strong>id</strong>
        </code>
      </td>
      <td>
        <p>Unique identifier of the showroom</p>
        <strong>Constraints</strong>
        <ul>
          <li>
            required:
            <code>true</code>
          </li>
        </ul>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>showroom-downtown-123</code>
          </li>
        </ul>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="title">
        <code>
          <strong>title</strong>
        </code>
      </td>
      <td>
        <p>The name of the showroom</p>
        <strong>Constraints</strong>
        <ul>
          <li>
            required:
            <code>true</code>
          </li>
        </ul>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>Downtown Auto Gallery</code>
          </li>
        </ul>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="country">
        <code>
          <strong>country</strong>
        </code>
      </td>
      <td>
        <p>Country where the showroom is located</p>
        <strong>Constraints</strong>
        <ul>
          <li>
            required:
            <code>true</code>
          </li>
        </ul>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>United States</code>
          </li>
        </ul>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="region">
        <code>
          <strong>region</strong>
        </code>
      </td>
      <td>
        <p>State or region within the country</p>
        <strong>Constraints</strong>
        <ul>
          <li>
            required:
            <code>true</code>
          </li>
        </ul>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>California</code>
          </li>
        </ul>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="city">
        <code>
          <strong>city</strong>
        </code>
      </td>
      <td>
        <p>Closest city where the showroom is located</p>
        <strong>Constraints</strong>
        <ul>
          <li>
            required:
            <code>true</code>
          </li>
        </ul>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>Los Angeles</code>
          </li>
        </ul>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="address">
        <code>
          <strong>address</strong>
        </code>
      </td>
      <td>
        <p>Street address of the showroom</p>
        <strong>Constraints</strong>
        <ul>
          <li>
            required:
            <code>true</code>
          </li>
        </ul>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>123 Main Street</code>
          </li>
        </ul>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="postcode">
        <code>
          <strong>postcode?</strong>
        </code>
      </td>
      <td>
        <p>Postal code of the showroom location</p>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>90210</code>
          </li>
        </ul>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="phone">
        <code>
          <strong>phone?</strong>
        </code>
      </td>
      <td>
        <p>Contact phone number for the showroom</p>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>+1-555-123-4567</code>
          </li>
        </ul>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="email">
        <code>
          <strong>email?</strong>
        </code>
      </td>
      <td>
        <p>Contact email address for the showroom</p>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>info@downtownauto.com</code>
          </li>
        </ul>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="url">
        <code>
          <strong>url?</strong>
        </code>
      </td>
      <td>
        <p>URL to the showroom</p>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>https://www.downtownauto.com</code>
          </li>
        </ul>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="lon">
        <code>
          <strong>lon?</strong>
        </code>
      </td>
      <td>
        <p>Longitude coordinate of the showroom location</p>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>-118.2437</code>
          </li>
        </ul>
      </td>
      <td>
        <code>number</code>
      </td>
    </tr>
    <tr>
      <td id="lat">
        <code>
          <strong>lat?</strong>
        </code>
      </td>
      <td>
        <p>Latitude coordinate of the showroom location</p>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>34.0522</code>
          </li>
        </ul>
      </td>
      <td>
        <code>number</code>
      </td>
    </tr>
  </tbody>
</table>