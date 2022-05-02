export const roundNum = (num, unit) => {
  let setUnit = unit;
  while ((num * setUnit) < 1) setUnit *=  10;
  return (Math.round(num * setUnit) / setUnit)
}

export const twoD = (digit => (String(digit).padStart(2, '0')));

const hsv_to_rgb = (h, s, v) => {
  let h_i = Math.floor(h*6);
  let f = h*6 - h_i;
  let p = v * (1 - s);
  let q = v * (1 - f*s);
  let t = v * (1 - (1 - f) * s);
  let rgb = [];
  if (h_i==0) rgb = [v, t, p];
  if (h_i==1) rgb = [q, v, p];
  if (h_i==2) rgb = [p, v, t];
  if (h_i==3) rgb = [p, q, v];
  if (h_i==4) rgb = [t, p, v];
  if (h_i==5) rgb = [v, p, q];
  
  return `rgb(${Math.floor(rgb[0]*256)}, ${Math.floor(rgb[1]*256)}, ${Math.floor(rgb[2]*256)})`;
}

export const getColor = () => {
  let goldenRatio = 0.618033988749895;
  let randNum = (Math.random() + goldenRatio) % 1;
  return hsv_to_rgb(randNum, 0.5, 0.95);
}
