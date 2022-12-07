export function ExecuteSql(db, query: string, params: any[] = []) {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        query,
        params,
        (tx, res) => resolve(res),
        e => reject(e),
      );
    });
  });
}

// https://infinitbility.com/react-native-sqlite-storage-examples-of-query#insert-query
