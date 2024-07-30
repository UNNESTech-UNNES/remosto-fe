let prefered = {
  gender: ['pria', 'wanita'],
  age: ['anak', 'remaja', 'dewasa']
}

const getMaxOfKey = (object) => {
  let max = {
    key: ["cek"],
    value: 0,
  };
  
  Object.entries(object).forEach((entry) => {
    const [key, value] = entry;

    if (key !== 'created_at') {
      if (value > max.value) {
        max.value = value;
        max.key = [key];
      } else if (value === max.value) {
        max.key.push(key);
      }
    }
  });
  
  return max.key;
};

export async function GET(req) {
  return new Response(JSON.stringify({
    status: 200,
    message: 'Done',
    default: prefered
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(req) {
  const data = await req.json();
  console.log(data);

  const gender = getMaxOfKey(data.gender);
  const age = getMaxOfKey(data.age);
  const race = getMaxOfKey(data.race);
  const luggage = getMaxOfKey(data.luggage);
  const expression = getMaxOfKey(data.expression);

  prefered = {
    gender,
    age,
    race,
    luggage,
    expression
  }

  return new Response(JSON.stringify({ message: 'Data received!', data: prefered }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export {prefered}