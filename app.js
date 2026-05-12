(function () {
  'use strict';

  var CSV_URL =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vR7R5Hk0hMNwXxduL3-_WXc952jaeAvOcd1XpYWETiD1nye-GO86NSQmDh8XdlZoz4SRjuxE0GGQ9uF/pub?output=csv';

  var statusEl = document.getElementById('status');

  function setStatus(text) {
    if (statusEl) statusEl.textContent = text;
  }

  // RFC 4180-friendly CSV parser. Handles quoted fields, escaped quotes ("")
  // and CR/LF line endings.
  function parseCsv(text) {
    var rows = [];
    var row = [];
    var field = '';
    var inQuotes = false;

    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);

      if (inQuotes) {
        if (ch === '"') {
          if (text.charAt(i + 1) === '"') {
            field += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          field += ch;
        }
        continue;
      }

      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        row.push(field);
        field = '';
      } else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && text.charAt(i + 1) === '\n') i++;
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      } else {
        field += ch;
      }
    }

    if (field.length > 0 || row.length > 0) {
      row.push(field);
      rows.push(row);
    }

    return rows.filter(function (r) {
      return r.length > 0 && r.some(function (c) { return c !== ''; });
    });
  }

  function csvToMap(text) {
    var rows = parseCsv(text);
    if (rows.length === 0) return {};

    var header = rows[0].map(function (h) { return h.trim().toLowerCase(); });
    var slugIdx = header.indexOf('slug');
    var urlIdx = header.indexOf('url');
    if (slugIdx === -1 || urlIdx === -1) return {};

    var map = {};
    for (var i = 1; i < rows.length; i++) {
      var slug = (rows[i][slugIdx] || '').trim().toLowerCase();
      var url = (rows[i][urlIdx] || '').trim();
      if (slug && url) map[slug] = url;
    }
    return map;
  }

  function getSlug() {
    return (window.location.hash || '').substring(1).trim();
  }

  function isSafeUrl(url) {
    // Allow only http(s) destinations to avoid javascript: / data: redirects.
    return /^https?:\/\//i.test(url);
  }

  function redirect() {
    var slug = getSlug();
    if (!slug) {
      setStatus('No link specified. 😶');
      return;
    }

    fetch(CSV_URL, { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('CSV fetch failed: ' + res.status);
        return res.text();
      })
      .then(function (text) {
        var map = csvToMap(text);
        var url = map[slug.toLowerCase()];
        if (url && isSafeUrl(url)) {
          window.location.replace(url);
        } else {
          setStatus('Destination does not exist! 😶');
        }
      })
      .catch(function () {
        setStatus('Failed to load redirect data. ⚠️');
      });
  }

  redirect();
  window.addEventListener('hashchange', redirect);
})();
