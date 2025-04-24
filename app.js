function calculate(event) {
  event.preventDefault();

  const lotSize = parseInt(document.getElementById("lotSize").value);
  const aql = document.getElementById("aql").value;
  const samplingType = document.getElementById("samplingType").value;

  if (isNaN(lotSize) || lotSize <= 0) {
    document.getElementById("result").innerHTML = "<p>Please enter a valid lot size.</p>";
    return;
  }

  const plans = {
    "0.65": [
      { max: 8, size: 2, ac: 0, re: 1 },
      { max: 15, size: 3, ac: 0, re: 1 },
      { max: 25, size: 5, ac: 0, re: 1 },
      { max: 50, size: 8, ac: 0, re: 1 },
      { max: 90, size: 13, ac: 0, re: 1 },
      { max: 150, size: 20, ac: 0, re: 1 },
      { max: 280, size: 32, ac: 1, re: 2 },
      { max: 500, size: 50, ac: 1, re: 2 },
      { max: 1200, size: 80, ac: 2, re: 3 },
      { max: 3200, size: 125, ac: 3, re: 4 },
      { max: 10000, size: 200, ac: 5, re: 6 },
      { max: 35000, size: 315, ac: 7, re: 8 },
      { max: 150000, size: 500, ac: 10, re: 11 },
      { max: 500000, size: 800, ac: 14, re: 15 },
      { max: Infinity, size: 1250, ac: 21, re: 22 }
    ],
    "1.0": [
      { max: 8, size: 2, ac: 0, re: 1 },
      { max: 15, size: 3, ac: 0, re: 1 },
      { max: 25, size: 5, ac: 0, re: 1 },
      { max: 50, size: 8, ac: 0, re: 1 },
      { max: 90, size: 13, ac: 1, re: 2 },
      { max: 150, size: 20, ac: 1, re: 2 },
      { max: 280, size: 32, ac: 2, re: 3 },
      { max: 500, size: 50, ac: 3, re: 4 },
      { max: 1200, size: 80, ac: 5, re: 6 },
      { max: 3200, size: 125, ac: 7, re: 8 },
      { max: 10000, size: 200, ac: 10, re: 11 },
      { max: 35000, size: 315, ac: 14, re: 15 },
      { max: 150000, size: 500, ac: 21, re: 22 },
      { max: 500000, size: 800, ac: 21, re: 22 },
      { max: Infinity, size: 1250, ac: 21, re: 22 }
    ],
    "2.5": [
      { max: 8, size: 2, ac: 0, re: 1 },
      { max: 15, size: 3, ac: 0, re: 1 },
      { max: 25, size: 5, ac: 1, re: 2 },
      { max: 50, size: 8, ac: 1, re: 2 },
      { max: 90, size: 13, ac: 2, re: 3 },
      { max: 150, size: 20, ac: 3, re: 4 },
      { max: 280, size: 32, ac: 5, re: 6 },
      { max: 500, size: 50, ac: 7, re: 8 },
      { max: 1200, size: 80, ac: 10, re: 11 },
      { max: 3200, size: 125, ac: 14, re: 15 },
      { max: 10000, size: 200, ac: 21, re: 22 },
      { max: 35000, size: 315, ac: 21, re: 22 },
      { max: 150000, size: 500, ac: 21, re: 22 },
      { max: 500000, size: 800, ac: 21, re: 22 },
      { max: Infinity, size: 1250, ac: 21, re: 22 }
    ]
  };

  const table = plans[aql];

  if (!table) {
    document.getElementById("result").innerHTML = `<p>No sampling plan available for AQL ${aql}.</p>`;
    return;
  }

  let result = {};
  for (let row of table) {
    if (lotSize <= row.max) {
      result.size = row.size;
      result.ac = samplingType === "c0" ? 0 : row.ac;
      result.re = samplingType === "c0" ? 1 : row.re;
      break;
    }
  }

  if (!result.size) {
    document.getElementById("result").innerHTML = `<p>Lot size exceeds supported range.</p>`;
    return;
  }

  document.getElementById("result").innerHTML = `
    <p><strong>Sample Size:</strong> ${result.size}</p>
    <p><strong>Accept:</strong> ${result.ac} defect(s)</p>
    <p><strong>Reject:</strong> ${result.re} or more defects</p>
  `;
}

