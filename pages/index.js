import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.scss'
import layoutStyles from '../styles/layout.module.scss'
import informationStyles from '../styles/information.module.scss'
import Date from '../components/date'
import StarRating from '../components/star'

export async function getServerSideProps(context) {
  const _host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://taiducnguyen-github-io.vercel.app';
  const resPerson = await fetch(`${_host}/api/person`);
  const personInfos = await resPerson.json();

  const resCareer = await fetch(`${_host}/api/career`);
  const careers = await resCareer.json();

  const resWorkedProjects = await fetch(`${_host}/api/workedProject`);
  const workedProjects = await resWorkedProjects.json();

  const resWorkedFreelanceProjects = await fetch(`${_host}/api/workedFreelanceProject`);
  const workedFreelanceProjects = await resWorkedFreelanceProjects.json();

  const resObjective = await fetch(`${_host}/api/objective`);
  const objective = await resObjective.json();

  return {
    props: {
      personInfos,
      careers,
      workedProjects,
      workedFreelanceProjects,
      objective
    }
  }
}
function renderPersonInfo(data, isLast) {
  switch (data.type) {
    case "profile":
      return (
        <div className={informationStyles.avatar}>
          <h3 className={informationStyles.fullName}>{data.fullName}</h3>
          <span className={informationStyles.jobTitle}>{data.jobTitle}</span>
          <Image
            priority
            src={data.profileImage}
            className={`${utilStyles.borderCircle}`}
            height={100}
            width={100}
            alt={data.fullName} />
        </div>
      )
    case "contact":
      return renderContactInfo(data);
    case "skills":
      return (
        <div className={layoutStyles.careerCardItem}>
          <h4 className={layoutStyles.pointerLabel}>{data.title}</h4>
          {data.skillset && data.skillset.map((skill, i) =>
            <div key={i} className={layoutStyles.skillSet}>
              <label>{skill.name}</label>
              {StarRating({ value: +skill.score, readonly: true })}
            </div>
          )}
        </div>
      );
    default:
      return (
        <div className={`${layoutStyles.careerCardItem} ${isLast ? layoutStyles.isLast : ''}`}>
          <h4 className={layoutStyles.pointerLabel}>{data.title}</h4>
          <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </div>
      )
  }
}

function renderContactInfo(data) {
  return (
    <div className={layoutStyles.careerCardItem}>
      <h4 className={layoutStyles.pointerLabel}>{data.title}</h4>
      <span className={layoutStyles.iconLinkContent}>
        <Image
          priority
          src="/images/calendar.svg"
          height={20}
          width={20}
          alt={data.dob} />
        <Date dateString={data.dob} />
      </span>
      <span className={layoutStyles.iconLinkContent}>
        <Image
          priority
          src="/images/person.svg"
          height={20}
          width={20}
          alt={data.gender} />
        <span>{data.gender}</span>
      </span>
      <a className={layoutStyles.iconLinkContent} href={`tel:${data.phoneNumber}`}>
        <Image
          priority
          src="/images/phone.svg"
          height={20}
          width={20}
          alt={data.phoneNumber} />
        <span>{data.phoneNumber}</span>
      </a>
      <a className={layoutStyles.iconLinkContent} href={`mailto:${data.email}`}>
        <Image
          priority
          src="/images/email.svg"
          height={20}
          width={20}
          alt={data.email} />
        <span>{data.email}</span>
      </a>
      <span className={layoutStyles.iconLinkContent}>
        <Image
          priority
          src="/images/location.svg"
          height={20}
          width={20}
          alt={data.address} />
        <span>{data.address}</span>
      </span>
    </div>
  )
}

export default function Home({ personInfos, careers, workedProjects, workedFreelanceProjects, objective }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={layoutStyles.mainContent}>
        <section className={layoutStyles.personalInformation}>
          {personInfos && personInfos.map((data, i) => <div key={i}>
            {renderPersonInfo(data, (personInfos.length - 1 === i))}
          </div>)}
        </section>
        <section className={layoutStyles.careerInformation}>
          <div className={layoutStyles.careerCardItem}>
            <h4 className={layoutStyles.pointerLabel}>Objective</h4>
            <div dangerouslySetInnerHTML={{ __html: objective.content }}></div>
          </div>
          {careers && careers.map((data, i) => <div className={layoutStyles.careerCardItem} key={i}>
            <h4 className={layoutStyles.pointerLabel}>{data.title}</h4>
            {data.subTitle && <h5>{data.subTitle}</h5>}
            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
          </div>)}
          <div className={`${layoutStyles.careerCardItem}`}>
            <h4 className={layoutStyles.pointerLabel}>Outstanding projects</h4>
            {workedProjects && workedProjects.map((data, i) => <div className={`${layoutStyles.mainProjects}`} key={i}>
              <h5>{data.projectName}</h5>
              <span className={layoutStyles.time}>{data.time}</span>
              <div className={layoutStyles.tagItems}>
                <div className={layoutStyles.tagLabel}>Role</div>
                <div className={layoutStyles.tagContent}>{data.role}</div>
              </div>
              <div className={layoutStyles.tagItems}>
                <div className={layoutStyles.tagLabel}>Project Description</div>
                <div dangerouslySetInnerHTML={{ __html: data.description }} className={layoutStyles.tagContent}></div>
              </div>
              <div className={layoutStyles.tagItems}>
                <div className={layoutStyles.tagLabel}>Main responsibilities</div>
                <div dangerouslySetInnerHTML={{ __html: data.responsibilities }} className={layoutStyles.tagContent}>{ }</div>
              </div>
              <div className={layoutStyles.tagItems}>
                <div className={layoutStyles.tagLabel}>Skill set utilized</div>
                <div className={layoutStyles.tagContent}>{data.skillset}</div>
              </div>
            </div>)}
          </div>
          <div className={`${layoutStyles.careerCardItem} ${layoutStyles.isLast}`}>
            <h4 className={layoutStyles.pointerLabel}>Freelance projects</h4>
            {workedFreelanceProjects && workedFreelanceProjects.map((data, i) => <div className={`${layoutStyles.mainProjects}`} key={i}>
              <h5>{data.projectName}</h5>
              <span className={layoutStyles.time}>{data.time}</span>
              <div className={layoutStyles.tagItems}>
                <div className={layoutStyles.tagLabel}>Role</div>
                <div className={layoutStyles.tagContent}>{data.role}</div>
              </div>
              <div className={layoutStyles.tagItems}>
                <div className={layoutStyles.tagLabel}>Project Description</div>
                <div dangerouslySetInnerHTML={{ __html: data.description }} className={layoutStyles.tagContent}></div>
              </div>
              <div className={layoutStyles.tagItems}>
                <div className={layoutStyles.tagLabel}>Main responsibilities</div>
                <div dangerouslySetInnerHTML={{ __html: data.responsibilities }} className={layoutStyles.tagContent}>{ }</div>
              </div>
              <div className={layoutStyles.tagItems}>
                <div className={layoutStyles.tagLabel}>Skill set utilized</div>
                <div className={layoutStyles.tagContent}>{data.skillset}</div>
              </div>
            </div>)}
          </div>
        </section>
      </div>
    </Layout>
  )
}