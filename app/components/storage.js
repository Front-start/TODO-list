export let ItemsStorage = {
  fields: {
    id: { type: "number", name: "№" },
    name: { type: "string", name: "Заголовок" },
    date: { type: "date", name: "Дата добавления" },
    date2: { type: "date", name: "Дедлайн" },
    content: { type: "string", name: "Задача" }
  },
  items: [
    {
      id: 1,
      state: 60,
      name: "[HMR] Cannot apply update. Need to do a full reload!",
      date: "2017-12-31T07:16:30.000Z",
      date2: "2017-12-27T14:23:10.000Z",
      content:
        "Односвязный список – это структура данных, которая состоит из элементов, каждый из которых хранит ссылку на следующий. Последний элемент может не иметь ссылки, либо она равна null."
    },
    {
      id: 25,
      state: 80,
      name: "Табурет-стремянка М91.13",
      date: "2017-11-26T13:56:30.000Z",
      date2: "2017-12-17T04:23:10.000Z",
      content:
        "Табурет стремянка модели М91.13 отлично подойдет для дома и для дачи, как замена обычного табурета и обычной стремянки: дешевле купить один табурет стремянку, с помощью которой можно достать что-то с верхних полок или поправить шторы, чем покупать все по отдельности.Табурет стремянка М91.13 сделан из сосны, верх покрыт светлым лаком, а низ покрыт более темной морилкой."
    },
    {
      id: 2,
      state: 50,
      name: "[WDS] Disconnected!",
      date: "2017-12-31T07:21:30.000Z",
      date2: "2018-01-23T10:54:50.000Z",
      content:
        "При выполнении этого кода всплывет предупреждение о том, что для элементов списка требуется ключ. «Key» — это специальный строковый атрибут, который нужно включить при создании списков элементов. В следующем разделе мы расскажем, почему он так важен."
    },
    {
      id: 3,
      state: 10,
      name:
        "Здесь определен компонент ClickButton, который по сути представляет кнопку",
      date: "2017-12-31T07:49:50.000Z",
      date2: "2018-01-11T21:36:30.000Z",
      content:
        "Этот код заносит [2, 4, 6, 8, 10] в консоль. В React преобразование массивов устройств в списки элементов происходит аналогичным образом."
    },
    {
      id: 4,
      state: 70,
      name:
        "Для начала, давайте рассмотрим, как преобразовать списки в JavaScript",
      date: "2017-12-31T10:03:10.000Z",
      date2: "2018-01-02T17:36:30.000Z",
      content:
        "Мы контролируем не только равномерность по наполнению, но и форму факела распыляемого топлива. Для бензиновых форсунок критичным параметром, позволяющим определить необходимость промывки, является время впрыска и состояние топливной смеси."
    },
    {
      id: 5,
      state: 100,
      name: "Запотеть катку",
      date: "2017-12-31T06:59:50.000Z",
      date2: "2017-12-31T18:06:30.000Z",
      content:
        "Ключи, используемые в массивах устройств должны быть уникальными среди своих братьев. Тем не менее, они не должны быть абсолютно уникальным. Можно использовать одни и те же ключи, при создании двух разных массивов."
    }
  ]
};

ItemsStorage.items.forEach(function(item) {
  Object.defineProperty(item, "state", { enumerable: false });
});
