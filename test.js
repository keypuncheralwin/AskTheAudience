//sorting comments by time

const arr = [{id: 1, date: 'Sun Dec 12 2021 00:44:54 GMT+1030 (Australian Central Daylight Time)'}, {id: 2, date: 'Sun Dec 12 2021 00:47:41 GMT+1030 (Australian Central Daylight Time)'}];
        const sortByDate = arr => {
        const sorter = (a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        arr.sort(sorter);
        };
        sortByDate(arr);
        console.log((arr).reverse());





    //     <div>
    //   {data.map(item => {
    //       return (
    //       <div>
    //         <p>created on: {item.createdAt}</p>
    //         <p>username: {item.username}</p>
    //         <p>title: {item.title}</p>
    //         <p>description: {item.description}</p>
    //         {item.options.map(item => {
    //             return <div><p>option: {item.option.name[0]}</p> <p>numbers of votes: {item.option.votes} </p></div>
    //         })}
    //         </div>
    //       )
        
    //   })}
    //   </div>