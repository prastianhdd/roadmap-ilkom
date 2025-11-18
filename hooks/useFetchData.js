// hooks/useFetchData.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

// 1. Hook untuk mengambil daftar SEMESTER
export function useSemesters() {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSemesters() {
      try {
        setLoading(true);
        console.log("⏳ Mengambil data Semester...");

        // Coba 1: Tabel 'Semester' (Huruf Besar)
        let { data, error } = await supabase
          .from('Semester') 
          .select('*')
          .order('order', { ascending: true });

        // Coba 2: Tabel 'semester' (Huruf Kecil) - Fallback
        if (error) {
          console.log("⚠️ Gagal dengan 'Semester', mencoba 'semester'...");
          const retry = await supabase
            .from('semester')
            .select('*')
            .order('order', { ascending: true });
          
          data = retry.data;
          error = retry.error;
        }

        if (error) throw error;

        setSemesters(data || []);
      } catch (err) {
        console.error("❌ ERROR SUPABASE:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSemesters();
  }, []);

  return { semesters, loading, error };
}

// 2. Hook untuk mengambil COURSE berdasarkan Semester ID
export function useCoursesBySemester(semesterId) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!semesterId) return;

    async function fetchCourses() {
      try {
        setLoading(true);
        
        // Coba 1: 'Course'
        let { data, error } = await supabase
          .from('Course')
          .select('*')
          .eq('semesterId', semesterId)
          .order('name', { ascending: true });
        
        // Coba 2: 'course'
        if (error) {
           const retry = await supabase
             .from('course')
             .select('*')
             .eq('semesterId', semesterId)
             .order('name', { ascending: true });
           data = retry.data;
           error = retry.error;
        }

        if (error) throw error;
        
        setCourses(data || []);
      } catch (err) {
        console.error("❌ Error fetch courses:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [semesterId]);

  return { courses, loading, error };
}

// 3. Hook untuk mengambil DETAIL COURSE + MATERIAL
export function useCourseDetail(courseId) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State error ditambahkan

  useEffect(() => {
    if (!courseId) return;

    async function fetchDetail() {
      try {
        setLoading(true);
        
        // Coba 1: 'Course' dengan join 'Material'
        let { data, error } = await supabase
          .from('Course')
          .select(`*, materials:Material(*)`)
          .eq('id', courseId)
          .single();

        // Coba 2: 'course' dengan join 'material' (huruf kecil semua)
        if (error) {
           const retry = await supabase
            .from('course')
            .select(`*, materials:material(*)`)
            .eq('id', courseId)
            .single();
            
           if (retry.data) {
             data = retry.data;
             error = null;
           }
        }

        if (error) throw error;
        setCourse(data);

      } catch (err) {
        console.error("❌ Error fetch detail:", err.message);
        setError(err.message || 'Gagal mengambil data');
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [courseId]);

  return { course, loading, error };
}