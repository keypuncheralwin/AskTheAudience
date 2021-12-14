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


    // {
    //     "_id": "61b7342e3dcde035fcbacef9",
    //     "username": "johnboy",
    //     "title": "This is me testing the vote system",
    //     "description": "Hello, this is a sample description",
    //     "options": [
    //         {
    //             "option": {
    //                 "name": [
    //                     "sample text for option1"
    //                 ],
    //                 "votes": 25
    //             }
    //         },
    //         {
    //             "option": {
    //                 "name": [
    //                     "sample text for option2"
    //                 ],
    //                 "votes": 31
    //             }
    //         }
    //     ],
    //     "whoVoted": [
    //         {
    //             "username": "option index will go here"
    //         },
    //         {
    //             "username": "option index will go here"
    //         }
    //     ],
    //     "comments": [
    //         {
    //             "sampleUser": {
    //                 "comment": "sample comment",
    //                 "date": "Mon Dec 13 2021 22:23:18 GMT+1030 (Australian Central Daylight Time)"
    //             }
    //         }
    //     ],
    //     "createdAt": "2021-12-13T11:53:18.816Z",
    //     "updatedAt": "2021-12-14T00:07:49.783Z",
    //     "__v": 0
    // }

    router.post('/poll/vote', async (req,res) => {
        const pollId = req.body.pollId
        const optionId = req.body.optionId
        console.log(pollId)
        console.log(optionId)
        const query = "options."+optionId+".option.votes"
        try{
            const updateVote = await Polls.findOneAndUpdate(
            {
                "_id": ObjectId(pollId)
            },
            {
                "$inc": {
                    "options.1.option.votes":1
                }
            }
            )
            console.log('it worked?')
        }catch(err){
            console.log(err)
            res.json({message: err})
        }
        
    })