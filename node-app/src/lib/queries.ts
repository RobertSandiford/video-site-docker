
import QueryString from 'qs';

export function paramEmpty( param: (string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] | undefined) ) {
    return ( param === undefined || param === "" )
}
