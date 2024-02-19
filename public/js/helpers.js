const localStorageSet = (key, value, type) => {
  if (typeof (Storage) !== 'undefined') {
    value.type = type ? type : 'input';
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

const localStorageGet = (key, defaultValue) => {
  if (typeof (Storage) !== 'undefined') {
    const value = window.localStorage.getItem(key);
    if (value !== undefined) {
      return JSON.parse(value);
    }
  }
  return defaultValue;
};

const lsValue = (item, key) => {
  val = localStorageGet(item);
  if (val) {
    return key ? val[key] : val.detail;
  }
  return null;
}

const getCurrencySymbol = (currency) => {
  switch (currency) {
    case 'USD': return '$'; break;
    case 'TRY': return '₺'; break;
    default: return '£'; break;
  }
}

const unixTime = () => {
  const d = new Date();
  const n = d.getTime();

  return n;
}
