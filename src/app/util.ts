/**
 * 日付をフォーマットに合わせて文字列変換する。
 * といっても、下記の文字列置換してるだけです。
 * しかも、最初に出てきた1個しか置換しないです。
 * 2個目も変えたい場合は2回関数を呼ぶか、関数を修正して正規表現を使ってください。
 * - yyyy → 年(4桁固定)
 * - MM → 月(2桁固定)
 * - dd → 日(2桁固定)
 * - hh → 時(24時間、2桁固定)
 * - mm → 分(60分、2桁固定)
 * - ss → 秒(60秒、2桁固定)
 * - SSS → ミリ秒(1000ミリ秒、3桁固定)
 *
 * @param date 日付
 * @param format フォーマット
 */
export const formatDate = (date: Date, format: string) => {

  return format
    .replace('yyyy', ('0000' + date.getFullYear()).slice(-4))
    .replace('MM', ('0000' + date.getMonth()).slice(-2))
    .replace('dd', ('0000' + date.getDate()).slice(-2))
    .replace('hh', ('0000' + date.getHours()).slice(-2))
    .replace('mm', ('0000' + date.getMinutes()).slice(-2))
    .replace('ss', ('0000' + date.getSeconds()).slice(-2))
    .replace('SSS', ('0000' + date.getMilliseconds()).slice(-3));

};
