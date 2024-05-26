import { Cascader, DatePicker, Space } from "antd";
import css from "./training.module.scss";
const { RangePicker } = DatePicker;

export const Training = () => {
  const onOk = (value: unknown) => {
    console.log("onOk: ", value);
  };
  const options = [{ id: 1 }];
  return (
    <div>
      <div className={css.trpl}>
        <div className={css.trainCont}>
          <h2 className={css.textTrain}>My training</h2>
          <Space direction="vertical" size={12} className={css.formDate}>
            <RangePicker
              size="large"
              format="YYYY-MM-DD"
              onChange={(value, dateString) => {
                console.log("Selected Time: ", value);
                console.log("Formatted Selected Time: ", dateString);
              }}
              onOk={onOk}
            />
            <div className={css.boxBook}>
              <Cascader
                className={css.inputBook}
                options={options}
                placeholder="Please select"
              />
              <button className={css.btnAddBook}>add</button>
            </div>
          </Space>
        </div>
        <div className={css.goalBox}>
          <h2 className={css.goalText}>My goal</h2>
          <div className={css.stats}>
            <div className={css.stat}>
              <div className={css.statValue}>{2}</div>
              <div className={css.statLabel}>Кількість книг</div>
            </div>
            <div className={css.stat}>
              <div className={css.statValue}>{2}</div>
              <div className={css.statLabel}>Кількість днів</div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <table className={css.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Year</th>
              <th>Pages</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={css.chartContainer}>
      <div className={css.chartHeader}>
        <span className={css.chartTitle}>КІЛЬКІСТЬ СТОРІНОК / ДЕНЬ</span>
        <span className={css.chartValue}>34</span>
      </div>
      <div className={css.chartBody}>
        <div className={css.chartLinePlan}>
          <div className={css.chartPoint} style={{ left: '10%' }}></div>
          <div className={css.chartPoint} style={{ left: '30%' }}></div>
          <div className={css.chartPoint} style={{ left: '50%' }}></div>
          <div className={css.chartPoint} style={{ left: '70%' }}></div>
          <div className={css.chartPoint} style={{ left: '90%' }}></div>
        </div>
        <div className={css.chartLinePlan}>
          <div className={css.chartPoint} style={{ left: '10%' }}></div>
          <div className={css.chartPoint} style={{ left: '30%' }}></div>
          <div className={css.chartPoint} style={{ left: '50%' }}></div>
          <div className={css.chartPoint} style={{ left: '70%' }}></div>
          <div className={css.chartPoint} style={{ left: '90%' }}></div>
        </div>
      </div>
      <div className={css.chartFooter}>
        <span className={css.chartLabelPlan}>ПЛАН</span>
        <span className={css.chartlabelfact}>ФАКТ</span>
        <span className={css.chartTime}>ЧАС</span>
      </div>
    </div>
    </div>
  );
};
